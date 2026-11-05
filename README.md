# ĐƯỜNG LÊN ĐỈNH OLYMPIA - TRÒ CHƠI GIÁO DỤC TIỂU HỌC (VITE JS)

Trò chơi tương tác học tập được thiết kế theo phong cách trường quay truyền hình **Đường Lên Đỉnh Olympia** (VTV3), dành riêng cho học sinh tiểu học (Lớp 3, 4, 5). Dự án đã được chuyển đổi hoàn toàn sang cấu trúc **Vite JS (ES Modules)** hiện đại, tốc độ khởi động cực nhanh và hỗ trợ Hot Module Replacement (HMR).

---

## 🌟 ĐẶC ĐIỂM NỔI BẬT

1. **Giao diện trường quay truyền hình chuyên nghiệp:**
   - Tông màu chủ đạo: **Xanh dương hoàng gia** và **Vàng kim lấp lánh**.
   - Hiệu ứng ánh đèn rọi sân khấu (moving spotlights), sàn 3D phản quang.
   - 4 bục thi đấu tượng trưng cho 4 đội với màn hình hiển thị điểm số LED rực rỡ, hiệu ứng hào quang khi đến lượt đội thi đấu.
   - Biểu tượng Vòng nguyệt quế và cúp vô địch Olympia mạ vàng.

2. **Âm thanh trường quay sinh động (100% Web Audio API):**
   - Hoạt động mượt mà offline, không phụ thuộc kết nối mạng hay link mp3 ngoài.
   - Âm thanh kịch tính: Tiếng tích tắc đếm ngược, tiếng cảnh báo 3 giây cuối, tiếng chuông bấm giành quyền, tiếng trả lời ĐÚNG (chime hân hoan), tiếng trả lời SAI (còi buzzer), tiếng Ngôi sao hy vọng lấp lánh và bản nhạc Fanfare ăn mừng chiến thắng + tiếng vỗ tay rộn rã.

3. **Cấu trúc chuẩn 4 vòng thi Olympia:**
   - **Vòng 1: KHỞI ĐỘNG**
     - Mỗi đội trả lời 5 câu hỏi nhanh.
     - Mỗi câu đúng nhận 10 điểm.
     - Đồng hồ đếm ngược 15 giây với hiệu ứng vòng tròn SVG và âm thanh tích tắc.
   - **Vòng 2: VƯỢT CHƯỚNG NGẠI VẬT**
     - Bức tranh bí ẩn trung tâm bị che bởi 4 mảnh ghép và 1 ô trung tâm.
     - 4 hàng ngang gợi ý: Mỗi khi giải đúng hàng ngang, các chữ cái được mở ra và mảnh ghép tương ứng biến mất để lộ góc tranh bí ẩn.
     - Nút to rực rỡ: **BẤM CHUÔNG ĐOÁN TỪ KHÓA (40 điểm)** cho bất kỳ đội nào xin đoán chướng ngại vật!
   - **Vòng 3: TĂNG TỐC**
     - 4 câu hỏi tư duy logic nhanh (20 giây mỗi câu).
     - Thang điểm tăng dần: **10 - 20 - 30 - 40 điểm**.
     - Hỗ trợ giáo viên chấm điểm linh hoạt cho đội nhanh nhất hoặc nhiều đội.
   - **Vòng 4: VỀ ĐÍCH**
     - Từng đội chọn gói câu hỏi: **20, 30 hoặc 40 điểm** (3 câu hỏi mỗi đội).
     - Tính năng kinh điển: **NGÔI SAO HY VỌNG ⭐** (Đúng nhân đôi số điểm x2, Sai bị trừ điểm).
     - Chuông giành quyền cướp điểm cho 3 đội còn lại nếu đội chính trả lời sai.
   - **TỔNG KẾT & TRAO GIẢI VÔ ĐỊCH:**
     - Bục vinh quang 4 thứ hạng (1, 2, 3, 4).
     - Tự động xếp hạng đội có điểm số cao nhất lên ngôi Quán quân.
     - Hiệu ứng pháo hoa Canvas rực rỡ, vương miện vàng và dòng chữ: **CHÚC MỪNG NHÀ VÔ ĐỊCH!**

4. **Bảng điều khiển và công cụ dành cho Giáo viên:**
   - **Chấm điểm trực tiếp:** Nút `✓ ĐÚNG (+Điểm)` và `✗ SAI` trên màn hình, nút `+10` / `-10` ngay tại bục từng đội.
   - **Bảng xếp hạng trực tiếp:** Mở bảng xếp hạng huy chương 🥇🥈🥉 bất kỳ lúc nào.
   - **Toàn màn hình (F11 / Nút ⛶):** Phóng to toàn màn hình không viền trình duyệt khi kết nối máy chiếu / Tivi lớp học.
   - **Bộ câu hỏi mẫu phong phú:** Tích hợp sẵn bộ câu hỏi Toán tư duy, Tiếng Việt, Khoa học, Lịch sử - Địa lý Việt Nam, Kỹ năng sống & Đố vui thông minh.
   - **Tùy chỉnh nội dung bài học linh hoạt:**
     - Tab 1: Đổi tên trò chơi, môn học, lớp học, chủ đề và tên 4 đội.
     - Tab 2: Soạn câu hỏi trực quan từng vòng (Khởi động, Vượt CNV, Tăng tốc, Về đích).
     - Tab 3: Tải file `.json` về máy tính, mở file bài học đã lưu từ trước hoặc khôi phục về câu hỏi mẫu ban đầu.

---

## 🚀 HƯỚNG DẪN CHẠY VỚI VITE

### 1. Khởi chạy Development Server (Chế độ phát triển)
```bash
npm run dev
```
Trình duyệt sẽ tự động mở tại địa chỉ: `http://localhost:3000`

### 2. Đóng gói Production Build (Khi muốn xuất bản hoặc triển khai web)
```bash
npm run build
```
Mã nguồn tối ưu hóa, nén css/js sẽ được tạo ra tại thư mục `dist/`.

### 3. Xem trước bản Build (Preview)
```bash
npm run preview
```

---

## 📁 CẤU TRÚC THƯ MỤC VITE JS

```
duong-len-dinh-olympia/
├── dist/                  # Bản build tĩnh sẵn sàng triển khai
├── node_modules/          # Thư viện npm (Vite)
├── src/
│   ├── audio.js           # ES Module: Bộ tổng hợp âm thanh Web Audio API
│   ├── questions.js       # ES Module: Ngân hàng câu hỏi & Quản lý dữ liệu
│   ├── game.js            # ES Module: Bộ máy điều khiển game, đồng hồ, tính điểm
│   ├── style.css          # CSS: Sân khấu Olympia, ánh đèn, bục thi đấu, hiệu ứng
│   └── main.js            # Entry Point chính của Vite
├── index.html             # Giao diện HTML gốc
├── package.json           # Cấu hình scripts & dependencies
├── vite.config.js         # Cấu hình Vite Dev Server & Build
└── README.md              # Hướng dẫn chi tiết
```
