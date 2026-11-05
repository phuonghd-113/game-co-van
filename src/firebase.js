/**
 * DUONG LEN DINH OLYMPIA - Firebase Realtime Cloud Sync Module
 * Tích hợp đám mây miễn phí cho giáo viên theo chuẩn Offline-First
 * Sử dụng REST API của Firebase Realtime Database:
 * - Cực nhẹ, không cần thư viện ngoài, không xung đột dependency
 * - Chạy mượt mà trên mọi trình duyệt hiện đại
 */

const STORAGE_KEY_CONFIG = "olympia_firebase_config";

export class FirebaseSyncService {
  constructor() {
    this.config = this.loadConfig();
    this.status = this.config.databaseURL ? "checking" : "unconfigured";
    this.statusMessage = this.config.databaseURL ? "Đang kết nối..." : "Chưa cấu hình";
    this.statusListeners = [];
  }

  loadConfig() {
    // Giá trị cấu hình từ file .env (thông qua Vite import.meta.env)
    const envConfig = {
      databaseURL: (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_FIREBASE_DATABASE_URL) || "",
      authSecret: (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_FIREBASE_AUTH_SECRET) || "",
      workspaceKey: (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_FIREBASE_WORKSPACE_KEY) || "olympia_lop_hoc"
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          databaseURL: parsed.databaseURL || envConfig.databaseURL,
          authSecret: parsed.authSecret || envConfig.authSecret,
          workspaceKey: parsed.workspaceKey || envConfig.workspaceKey
        };
      }
    } catch {
      // Fallback
    }
    return envConfig;
  }

  saveConfig(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig
    };
    // Chuẩn hóa databaseURL bỏ dấu / ở cuối nếu có
    if (this.config.databaseURL) {
      this.config.databaseURL = this.config.databaseURL.trim().replace(/\/+$/, "");
    }
    if (this.config.workspaceKey) {
      this.config.workspaceKey = this.config.workspaceKey.trim().replace(/[^a-zA-Z0-9_-]/g, "_") || "olympia_lop_hoc";
    }
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(this.config));
    } catch {
      // Ignore
    }
  }

  isConfigured() {
    return Boolean(this.config.databaseURL && this.config.databaseURL.startsWith("http"));
  }

  getEndpointUrl() {
    if (!this.isConfigured()) return null;
    const key = this.config.workspaceKey || "olympia_lop_hoc";
    let url = `${this.config.databaseURL}/${key}.json`;
    if (this.config.authSecret) {
      url += `?auth=${encodeURIComponent(this.config.authSecret.trim())}`;
    }
    return url;
  }

  onStatusChange(listener) {
    if (typeof listener === "function") {
      this.statusListeners.push(listener);
      listener(this.status, this.statusMessage);
    }
  }

  notifyStatus(status, message) {
    this.status = status;
    this.statusMessage = message;
    this.statusListeners.forEach((fn) => {
      try {
        fn(status, message);
      } catch {
        // Ignore listener error
      }
    });
  }

  /**
   * Kiểm tra kết nối tới Firebase Realtime Database
   */
  async testConnection() {
    if (!this.isConfigured()) {
      this.notifyStatus("unconfigured", "Chưa nhập liên kết Firebase");
      return { success: false, error: "Vui lòng nhập Database URL của Firebase!" };
    }

    this.notifyStatus("syncing", "Đang kiểm tra kết nối...");
    try {
      const url = this.getEndpointUrl();
      // Gửi request đọc nhẹ kiểm tra quyền truy cập
      const res = await fetch(url, {
        method: "GET",
        headers: { "Accept": "application/json" }
      });

      if (!res.ok) {
        throw new Error(`Mã lỗi máy chủ Firebase: ${res.status} (${res.statusText})`);
      }

      this.notifyStatus("connected", "Đã kết nối Đám mây");
      return { success: true };
    } catch (err) {
      this.notifyStatus("error", "Lỗi kết nối Firebase");
      return { success: false, error: err.message || "Không thể kết nối tới máy chủ Firebase" };
    }
  }

  /**
   * Đẩy toàn bộ workspace (Sự kiện + Ngân hàng đề thi) lên Firebase
   */
  async pushWorkspaceToCloud(workspaceData) {
    if (!this.isConfigured()) {
      return { success: false, error: "Chưa cấu hình Firebase URL!" };
    }

    this.notifyStatus("syncing", "Đang đẩy dữ liệu lên Đám mây...");
    try {
      const url = this.getEndpointUrl();
      const payload = {
        ...workspaceData,
        lastCloudSyncedAt: new Date().toISOString()
      };

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Lỗi Firebase: ${res.status} ${res.statusText}`);
      }

      this.notifyStatus("connected", "Đã đồng bộ Đám mây");
      return { success: true, timestamp: payload.lastCloudSyncedAt };
    } catch (err) {
      this.notifyStatus("error", "Lỗi đồng bộ lên đám mây");
      return { success: false, error: err.message };
    }
  }

  /**
   * Tải toàn bộ workspace từ Firebase về máy
   */
  async pullWorkspaceFromCloud() {
    if (!this.isConfigured()) {
      return { success: false, error: "Chưa cấu hình Firebase URL!" };
    }

    this.notifyStatus("syncing", "Đang tải dữ liệu từ Đám mây...");
    try {
      const url = this.getEndpointUrl();
      const res = await fetch(url, {
        method: "GET",
        headers: { "Accept": "application/json" }
      });

      if (!res.ok) {
        throw new Error(`Lỗi Firebase: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      if (!data) {
        throw new Error("Dữ liệu trên Firebase hiện đang trống!");
      }

      this.notifyStatus("connected", "Đã đồng bộ Đám mây");
      return { success: true, data };
    } catch (err) {
      this.notifyStatus("error", "Lỗi tải từ đám mây");
      return { success: false, error: err.message };
    }
  }
}

export const firebaseSync = new FirebaseSyncService();
if (typeof window !== "undefined") {
  window.firebaseSync = firebaseSync;
}

