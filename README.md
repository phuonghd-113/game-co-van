# ĐƯỜNG LÊN ĐỈNH OLYMPIA - TRÒ CHƠI GIÁO DỤC TIỂU HỌC (VITE JS)

Trò chơi tương tác học tập được thiết kế theo phong cách trường quay truyền hình **Đường Lên Đỉnh Olympia** (VTV3), dành riêng cho học sinh tiểu học (Lớp 3, 4, 5). Dự án đã được chuyển đổi hoàn toàn sang cấu trúc **Vite JS (ES Modules)** hiện đại, tốc độ khởi động cực nhanh và hỗ trợ Hot Module Replacement (HMR).

---

## 🌟 ĐẶC ĐIỂM NỔI BẬT

1. **Giao diện trường quay sáng sủa, dễ nhìn khi chiếu:**
   - Nền sáng, tông **Xanh dương hoàng gia** và **Vàng kim**, chữ tương phản cao để chiếu rõ cả ban ngày.
   - 4 bục thi đấu cho 4 đội với bảng điểm lớn, nhãn **ĐANG THI ĐẤU** cho đội tới lượt.
   - Bố cục vừa khít các màn hình máy chiếu phổ biến (1280×720, 1366×768, 1920×1080): thanh chấm điểm luôn hiển thị, không bị cắt.
   - Dùng được trên **điện thoại / máy tính bảng** để giáo viên điều khiển: trang cuộn tự nhiên, thanh chấm điểm dính đáy màn hình, nút to dễ chạm.
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
     - Nút to rực rỡ: **BẤM CHUÔNG ĐOÁN TỪ KHÓA (40 điểm)** cho đội đang tới lượt; giáo viên chấm **ĐÚNG +40 / SAI / Hủy** ngay trong hộp thoại.
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
     - Tự động xếp hạng đội có điểm số cao nhất lên ngôi Quán quân; các đội bằng điểm được tính **đồng hạng** (vd. Đồng Quán Quân), chưa đội nào ghi điểm thì không công bố vô địch.
     - Hiệu ứng pháo hoa Canvas rực rỡ, vương miện vàng và dòng chữ: **CHÚC MỪNG NHÀ VÔ ĐỊCH!**

4. **Bảng điều khiển và công cụ dành cho Giáo viên:**
   - **Chấm điểm trực tiếp:** Nút `✓ ĐÚNG (+Điểm)` và `✗ SAI` trên màn hình, nút `+10` / `-10` ngay tại bục từng đội.
   - **Bảng xếp hạng trực tiếp:** Mở bảng xếp hạng (nút 🏆 hoặc phím L) bất kỳ lúc nào, có tính đồng hạng.
   - **Toàn màn hình (phím F / Nút ⛶):** Phóng to toàn màn hình không viền trình duyệt khi kết nối máy chiếu / Tivi lớp học. Mọi xác nhận đều dùng hộp thoại trong trang nên không làm thoát toàn màn hình.
   - **Chế độ trình chiếu (phím P / nút 🖥):** Ẩn toàn bộ nút dành cho giáo viên khỏi màn chiếu (chấm điểm, +10/-10, tài khoản...), phóng to câu hỏi; giáo viên điều khiển bằng phím tắt.
   - **Bộ câu hỏi mẫu phong phú:** Tích hợp sẵn bộ câu hỏi Toán tư duy, Tiếng Việt, Khoa học, Lịch sử - Địa lý Việt Nam, Kỹ năng sống & Đố vui thông minh.
   - **Cài đặt & quản lý nội dung (nút ⚙):**
     - Tab 1 – Sự kiện: tạo / nhân bản / xóa trận đấu, đổi tên, môn học, khối lớp, chọn bộ đề.
     - Tab 2 – Ngân hàng đề: soạn câu hỏi trực quan cho từng vòng (Khởi động, Vượt CNV, Tăng tốc, Về đích).
     - Tab 3 – 4 Đội thi đấu: đổi tên, sửa điểm; khu vực "Đặt lại trận đấu" (đặt điểm về 0, chơi lại từ đầu).
     - Tab 4 – JSON: tải file `.json` về máy, mở file đã lưu, khôi phục dữ liệu mẫu.
     - Tab 5 – Firebase: đồng bộ đề thi lên đám mây để soạn ở nhà, mở trên máy lớp học.

5. **Phím tắt điều khiển (bấm `?` trong trò chơi để xem bảng đầy đủ):**

   | Phím | Chức năng |
   |------|-----------|
   | `P` | Bật / tắt chế độ trình chiếu |
   | `F` / `L` / `M` | Toàn màn hình / Bảng xếp hạng / Bật-tắt âm thanh |
   | `Enter` / `Backspace` | Chấm ĐÚNG (cộng điểm) / Chấm SAI |
   | `R` | Hiện đáp án |
   | `→` / `←` | Câu tiếp / câu trước (Vòng 2: chọn hàng ngang) |
   | `Space` | Tạm dừng / chạy tiếp đồng hồ |
   | `1`–`4` | Chọn đội thi (Vòng 3: ghi nhận đội bấm chuông) |
   | `B` | Vòng 2: bấm chuông đoán từ khóa |
   | `0` | Vòng 3: đặt lại lượt bấm chuông |
   | `G` / `N` | Vòng 4: đổi gói 20 → 30 → 40 / bật-tắt Ngôi Sao Hy Vọng |
   | `Esc` | Đóng cửa sổ đang mở |

6. **Khả năng truy cập:** điều khiển được hoàn toàn bằng bàn phím (viền nổi bật khi dùng Tab, thẻ đáp án / bục đội bấm được bằng Enter), tự tắt pháo hoa và hiệu ứng chuyển động khi máy bật chế độ "Giảm chuyển động".

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
│   ├── firebase.js        # ES Module: Đồng bộ đề thi lên Firebase Realtime Database
│   ├── game.js            # ES Module: Bộ máy điều khiển game, đồng hồ, tính điểm
│   ├── style.css          # CSS: Sân khấu Olympia, bục thi đấu, bố cục máy chiếu / điện thoại
│   └── main.js            # Entry Point chính của Vite
├── index.html             # Giao diện HTML gốc
├── package.json           # Cấu hình scripts & dependencies
├── vite.config.js         # Cấu hình Vite Dev Server & Build
└── README.md              # Hướng dẫn chi tiết
```
