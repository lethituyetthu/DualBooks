# DỰ ÁN DUALBOOKS
## Mô Tả Dự Án
Dự án BookStore là một ứng dụng quản lý sách trực tuyến và trực tiếp, cung cấp các chức năng cho khách hàng và quản trị viên để quản lý thông tin sách, đơn hàng, và khách hàng.

## Chức Năng Khách Hàng
1. **Đăng Ký**
   - Khách hàng có thể tạo tài khoản bằng cách cung cấp họ tên, số điện thoại, email và địa chỉ.
   - Bảo mật thông tin bằng cách mã hóa mật khẩu.

2. **Đăng Nhập**
   - Khách hàng có thể đăng nhập bằng email và mật khẩu hoặc thông qua tài khoản Google.
   - Bảo vệ tài khoản với xác thực thông tin.

3. **Xem Danh Sách Sản Phẩm**
   - Duyệt qua danh sách sản phẩm (sách) với thông tin như tên, tác giả, giá và mô tả.
   - Tìm kiếm theo tên sách, tác giả, hoặc danh mục.

4. **Thêm Vào Giỏ Hàng**
   - Khách hàng có thể thêm sản phẩm vào giỏ hàng để thanh toán sau.

5. **Thanh Toán**
   - Thanh toán đơn hàng bằng các phương thức như COD hoặc chuyển khoản ngân hàng.
   - Đảm bảo an toàn thông tin thanh toán.

6. **Xem Và Quản Lý Đơn Hàng**
   - Xem danh sách đơn hàng đã đặt và quản lý trạng thái đơn hàng.

7. **Đánh Giá Sản Phẩm**
   - Khách hàng có thể để lại đánh giá cho sản phẩm đã mua.

8. **Hỗ Trợ Tìm Kiếm**
   - Cung cấp tính năng tìm kiếm sách theo danh mục, tên sách, tác giả, hoặc khoảng tiền.

9. **Thông Báo Trạng Thái Đơn Hàng**
   - Gửi thông báo cho khách hàng về trạng thái đơn hàng của họ.

10. **Chức Năng Quản Lý Đơn Hàng**
    - Cho phép khách hàng hủy đơn hàng trước khi xác nhận.

11. **Quản Lý Hồ Sơ Cá Nhân**
    - Khách hàng có thể xem và cập nhật thông tin cá nhân.

12. **Danh Sách Sách Yêu Thích**
    - Khách hàng có thể lưu các sách yêu thích để truy cập dễ dàng sau này.

13. **Hỗ Trợ Trực Tuyến**
    - Cung cấp tính năng trò chuyện trực tuyến hoặc hệ thống ticket hỗ trợ khách hàng.

14. **Khuyến Mãi Và Ưu Đãi**
    - Cung cấp thông tin về chương trình khuyến mãi và ưu đãi đặc biệt.

15. **Theo Dõi Sách Mới**
    - Khách hàng có thể đăng ký nhận thông báo về sách mới.

## Chức Năng Quản Trị Viên
1. **Quản Lý Nhân Viên**
   - Xem, thêm, cập nhật và xóa thông tin nhân viên.

2. **Quản Lý Khách Hàng**
   - Xem danh sách khách hàng và quản lý thông tin khách hàng.

3. **Quản Lý Sản Phẩm**
   - Xem, thêm, cập nhật và xóa thông tin sản phẩm, cập nhật số lượng tồn kho.

4. **Quản Lý Danh Mục Sản Phẩm**
   - Xem, thêm, cập nhật và xóa danh mục sản phẩm.

5. **Thống Kê**
   - Thống kê doanh thu hàng ngày và hàng tháng, số lượng sản phẩm tồn kho.

## Chức Năng Nhân Viên
1. **Đăng Nhập**
   - Nhân viên đăng nhập vào hệ thống bằng tài khoản và mật khẩu.

2. **Xem Danh Sách Sản Phẩm**
   - Nhân viên xem thông tin các sản phẩm có sẵn.

3. **Cập Nhật Số Lượng Sản Phẩm**
   - Nhân viên cập nhật số lượng sản phẩm tồn kho.

4. **Tạo Đơn Hàng**
   - Nhân viên tạo đơn hàng cho khách hàng mua trực tiếp.

5. **Thanh Toán Cho Khách Hàng**
   - Nhân viên tiến hành thanh toán cho khách hàng.

6. **Quản Lý Đơn Hàng**
   - Xem danh sách đơn hàng và xử lý đơn hàng.
## Công Nghệ Sử Dụng
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js
- **Cơ Sở Dữ Liệu:** MongoDB

## Cài đặt
1. Clone repository:
    ```bash
    git clone  git clone https://github.com/lethituyetthu/du_an_tot_nghiep.git
    ```
2. Di chuyển vào thư mục dự án:
    ```bash
    cd front-end
    npm install
    ```
    ```bash
    cd back-end
    npm install cors
    npm run dev 
    ```
4. Cài đặt các package:
    ```bash
    npm run dev 
    ```
    npm intall 

## Sử dụng
1. Khởi động dự án:
    ```bash
    npm start
    ```
2. Truy cập ứng dụng tại `http://localhost:3000`.

## Cấu trúc dự án
```bash
├── src/                # Mã nguồn chính
│   ├── components/     # Các component React
│   ├── pages/          # Các trang giao diện
│   └── utils/          # Các tiện ích và helpers
├── public/             # Các tài nguyên công cộng
├── package.json        # Các thông tin cấu hình dự án và dependencies
└── README.md           # Mô tả dự án
