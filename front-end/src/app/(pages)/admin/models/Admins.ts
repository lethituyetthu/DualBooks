// models/Admins.ts

export interface Admin {
    _id: string; // ID duy nhất cho admin
    username: string; // Tên đăng nhập
    email: string; // Địa chỉ email
    password: string; // Mật khẩu (nên không lưu mật khẩu trong state nếu không cần thiết)
    user_img: string; // Đường dẫn đến hình ảnh người dùng
    role: 'admin' | 'staff'; // Vai trò của người dùng, có thể là admin hoặc staff
    created_at: string; // Ngày tạo admin
    updated_at: string; // Ngày cập nhật admin
}
