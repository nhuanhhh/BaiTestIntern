# BÁO CÁO BÀI TEST: INTERN FULLSTACK DEVELOPER
Họ và tên: [Nguyễn Như Anh]
Vị trí ứng tuyển: Fullstack Developer (Thiên về Frontend)

---

## PHẦN 1: HƯỚNG DẪN CÀI ĐẶT (SETUP GUIDE)

Để chạy dự án ở local, vui lòng thực hiện theo các bước sau:

**A. Khởi chạy Backend**
Yêu cầu: Node.js v18+, MongoDB (Local hoặc Atlas).

```bash
cd Backend
npm install
# Cấu hình file .env: DATABASE_URL="mongodb+srv://..."
npx prisma generate
node src/seed.js  # Chạy lệnh này để nạp dữ liệu mẫu
npm run dev
# Server running at: http://localhost:8386

**B. Khởi chạy Frontend**
Bash
cd Frontend
npm install
npm run dev
# -> Web chạy tại: http://localhost:5173

***II: YÊU CẦU CHUNG***

**Câu 1: Liệt kê các API theo chuẩn RESTful**
Để hệ thống hoạt động, em thiết kế danh sách các đường dẫn (API) cần thiết như sau:
Nhóm Auth (Xác thực):
POST /api/auth/login: Đăng nhập vào hệ thống.
POST /api/auth/register: Đăng ký tài khoản mới.
Nhóm Jobs (Công việc):
GET /api/jobs: Lấy danh sách công việc (có thể lọc theo tên, trạng thái).
GET /api/jobs/:id: Xem chi tiết một công việc.
POST /api/jobs: Tạo công việc mới (Dành cho Nhà tuyển dụng).
PUT /api/jobs/:id: Sửa thông tin công việc.
DELETE /api/jobs/:id: Xóa công việc (Nếu đăng nhầm hoặc hủy tuyển).
Nhóm Applications (Ứng tuyển):
POST /api/apply: Ứng viên gửi CV nộp đơn.
GET /api/jobs/:id/applications: Xem danh sách người đã nộp vào một Job (Dành cho Nhà tuyển dụng).
PUT /api/applications/:id/status: Đổi trạng thái ứng viên (Ví dụ: từ "Mới" sang "Đã tuyển").
DELETE /api/applications/:id: Xóa hồ sơ ứng viên (Dùng khi ứng viên rút hồ sơ hoặc hồ sơ spam).

**Câu 2: Đề xuất tính năng AI, Blockchain**
AI (Trí tuệ nhân tạo): Em đề xuất dùng AI để đọc tự động file CV. Thay vì bắt ứng viên nhập tay kinh nghiệm, kỹ năng, AI sẽ đọc file PDF rồi tự điền vào bảng. Giúp tiết kiệm thời gian nhập liệu.
Blockchain: Dùng để kiểm tra bằng cấp thật. Nhà trường sẽ lưu mã số bằng cấp lên Blockchain. Khi tuyển dụng, hệ thống tự đối chiếu mã này để biết ứng viên có dùng bằng giả hay không.

=== PHẦN 2: NẾU BẠN THẾ MẠNH BACKEND ===
Dù thế mạnh của em là Frontend, nhưng em xin phép trình bày suy nghĩ của mình cho các câu hỏi này:

**Câu 3: Quy tắc nghiệp vụ (Business Rules)**
Em xác định các quy tắc quan trọng để hệ thống chạy đúng:
Khi Ứng viên nộp đơn: Hệ thống phải kiểm tra trong Database xem người này đã nộp vào Job này chưa. Nếu có rồi thì chặn lại, báo lỗi "Đã nộp đơn" để tránh spam.
Khi Nhà tuyển dụng đổi trạng thái: Chỉ có người tạo ra Job đó mới được quyền sửa trạng thái ứng viên. Backend phải kiểm tra ID người đang đăng nhập có trùng với ID chủ Job không.

**Câu 4: Vẽ Schema Database**
Trong code demo em chạy bản đơn giản để test tính năng. Còn với hệ thống thực tế hoàn chỉnh, em đề xuất mô hình gồm 3 bảng chính:
Bảng User: id, email, password, role (tài khoản của ứng viên và nhà tuyển dụng).
Bảng Job: id, title, status, employer_id (Lưu công việc, liên kết với User).
Bảng Application: id, job_id, candidate_id, status (Lưu đơn nộp, nối giữa Job và User).

**Câu 5: Vẽ Flow chart (Mô tả luồng)**
Flow Đăng nhập: Người dùng nhập Email/Pass -> Server tìm trong DB -> So sánh mật khẩu (đã mã hóa) -> Nếu đúng thì trả về Token đăng nhập.
Flow Apply: Server nhận file CV -> Kiểm tra định dạng (PDF/Word) -> Kiểm tra xem user này đã nộp vào job này chưa -> Nếu thỏa mãn thì Lưu vào DB -> Báo "Thành công".

**Câu 6: Kiểm soát quyền truy cập**
Tất cả mọi người đều xem được danh sách Job.
Chỉ Nhà tuyển dụng (chủ Job) mới xem được danh sách Ứng viên của mình.
Ứng viên không được sửa hồ sơ sau khi đã nộp.
Nhà tuyển dụng được sửa trạng thái (Status) của ứng viên (ví dụ: Mời phỏng vấn, Đã tuyển).

**Câu 7: Một số solution ở phía Backend mà em nghĩ sẽ khắc phục được vấn đề là:**
Khi có hàng chục nghìn lượt apply, em đề xuất:
Phân trang (Pagination): Không trả về toàn bộ hàng chục ứng viên một lúc. Server chỉ nên trả về 20-50 người mỗi lần gọi.
Đánh chỉ mục (Indexing): Đánh dấu các cột quan trọng trong Database (như job_id, status). Việc này giúp tìm kiếm nhanh hơn gấp nhiều lần (giống như tra mục lục sách thay vì lật từng trang).

=== PHẦN 3: NẾU BẠN THẾ MẠNH FRONTEND ===

**Câu 10: Quy tắc nghiệp vụ (Frontend)**
Em đã code các logic chặn lỗi ngay tại giao diện:
Khi Ứng viên Apply: Em kiểm tra file, nếu nặng quá 5MB thì báo lỗi ngay, không cho gửi. Nút "Nộp đơn" sẽ bị khóa sau khi bấm để tránh bấm liên tục.
Khi Đổi trạng thái: Khi kéo thả ứng viên, giao diện sẽ cập nhật vị trí ngay lập tức (để người dùng thấy nhanh), sau đó code mới gửi lệnh ngầm xuống Server.

**Câu 11: Phương án "Xác nhận thuê"**
Yêu cầu: Khi chọn trạng thái "Đã tuyển" (HIRED), cần phải xác nhận kỹ vì đây là quyết định quan trọng.
Giải pháp của em: Khi người dùng bấm nút "Tuyển", em chưa gọi API ngay. Em hiện lên một hộp thoại window.confirm: "Bạn có chắc chắn muốn tuyển ứng viên này không?". Chỉ khi họ bấm OK thì em mới thực hiện lệnh tuyển.
**Câu 12: Deploy lên Vercel**
Link Demo: [Điền link Vercel của bạn vào đây]

**Câu 13: Giải quyết vấn đề hệ thống chậm (Frontend Solution)**
Khi danh sách ứng viên quá dài (ví dụ 10.000 người), trình duyệt sẽ bị đơ nếu hiển thị hết. Em có các giải pháp đơn giản và hiệu quả sau:
Phân trang (Pagination): Đây là cách hiệu quả nhất. Thay vì hiển thị danh sách dài dằng dặc, em sẽ chia nhỏ dữ liệu ra thành nhiều trang (Ví dụ: Trang 1, Trang 2...). Mỗi trang chỉ hiển thị 20 ứng viên. Người dùng muốn xem thêm thì bấm nút chuyển trang. Việc này giúp trình duyệt nhẹ và không bao giờ bị lag.
Debounce (Cho ô tìm kiếm): Khi người dùng gõ tên để lọc (Filter), em sẽ không gọi API ngay lập tức sau mỗi ký tự họ gõ (vì sẽ làm hệ thống quá tải). Em dùng kỹ thuật Debounce: Đợi người dùng ngừng gõ khoảng 0.5 giây rồi mới bắt đầu lọc dữ liệu.
