export interface Books {
    id: string;               // ID duy nhất của sách
    title: string;             // Tiêu đề của sách
    author: string;            // Tác giả của sách
    description: string;       // Mô tả ngắn về nội dung sách
    price: number;             // Giá của sách
    stock: number;             // Số lượng sách có sẵn
    cover_image: string;       // Tên hoặc đường dẫn của ảnh bìa sách
    categoryID: string;        // ID của danh mục sách thuộc về
    views: number;             // Số lượt xem của sách
    sales: number;             // Số lượng sách đã bán
    created_at: Date;          // Ngày tạo bản ghi sách
    updated_at: Date;          // Ngày cập nhật bản ghi sách
}   