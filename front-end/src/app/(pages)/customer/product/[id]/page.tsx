"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useFetchBook from "../../hook/useFetchBook"; // Hook lấy dữ liệu sách
import { typeBook } from "../../hook/useFetchBook"; // Thay đổi đường dẫn nếu cần thiết

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { books, loading, error } = useFetchBook(); // Hook lấy dữ liệu sách
  const [product, setProduct] = useState<typeBook | null>(null); // Dữ liệu sản phẩm chi tiết
  const [quantity, setQuantity] = useState<number>(1); // Số lượng sản phẩm

  // State for product ratings and comments
  const [rating, setRating] = useState<number>(0); // Rating sao
  const [comments, setComments] = useState<Array<{ name: string; comment: string; rating: number }>>([
    { name: "Nguyễn Văn A", comment: "Cuốn sách rất hay, đáng đọc.", rating: 5 },
    { name: "Trần B", comment: "Nội dung chưa được như kỳ vọng.", rating: 3 }
  ]); // Danh sách bình luận

  useEffect(() => {
    if (id && books.length > 0) {
      // Tìm sản phẩm dựa vào id
      const selectedProduct = books.find((book) => book.id === id);
      if (selectedProduct) {
        setProduct(selectedProduct); // Cập nhật sản phẩm được chọn
      }
    }
  }, [id, books]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  // Xử lý thay đổi số lượng
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Xử lý đánh giá sao
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  // Xử lý thêm bình luận mới
  const handleAddComment = (name: string, comment: string) => {
    if (comment.trim() !== "") {
      setComments([...comments, { name, comment, rating }]);
      setRating(0); // Reset rating sau khi gửi bình luận
    }
  };

  return (
    <div className="max-w-[1200px] m-auto p-4">
      {/* Phần chi tiết sản phẩm - Nổi bật */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 border border-gray-300 rounded-lg shadow-lg mb-8 bg-white">
        {/* Cột bên trái: Hình ảnh sản phẩm */}
        <div>
          <div className="flex justify-center">
            <Image
              src={`http://localhost:3200/uploads/books/${product.cover_image}`}
              alt={product.title}
              width={300}
              height={400}
              className="object-cover mb-4"
            />
          </div>

          {/* Dưới hình ảnh: Thanh trượt hình ảnh sản phẩm liên quan */}
          <div className="flex space-x-2 overflow-x-auto">
            {books.map((relatedBook) => (
              <div key={relatedBook.id} className="flex-shrink-0">
                <Image
                  src={`http://localhost:3200/uploads/books/${relatedBook.cover_image}`}
                  alt={relatedBook.title}
                  width={100}
                  height={150}
                  className="object-cover cursor-pointer hover:opacity-75"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Cột bên phải: Thông tin chi tiết sản phẩm */}
        <div>
          <h1 className="text-3xl font-bold mb-6">{product.title}</h1>
          <p className="text-gray-700 text-lg mb-6">
            Giá: {(product.price * 1000).toLocaleString("vi-VN") + " đ"}
          </p>
          <p className="mb-6 text-lg">{product.description}</p>
          
          {/* Đánh giá 5 sao */}
          <div className="flex items-center mb-6">
            <span className="text-yellow-500 text-2xl">★★★★★</span>
            <span className="ml-2 text-gray-500 text-lg">(Đánh giá)</span>
          </div>

          {/* Khuyến mãi combo */}
          <div className="bg-green-100 p-4 mb-6 rounded">
            <p className="text-green-700 font-semibold text-lg">Mua 2 giảm 5.000 VNĐ</p>
          </div>

          {/* Bộ chọn số lượng */}
          <div className="flex items-center mb-6">
            <button 
              onClick={handleDecrease}
              className="px-4 py-2 bg-gray-300 rounded-l text-lg"
            >
              -
            </button>
            <span className="px-6 py-2 bg-white border text-lg">{quantity}</span>
            <button 
              onClick={handleIncrease}
              className="px-4 py-2 bg-gray-300 rounded-r text-lg"
            >
              +
            </button>
          </div>

          {/* Thông tin vận chuyển */}
          <div className="text-gray-600 mb-6 text-lg">
            <p>Vận chuyển: Miễn phí vận chuyển</p>
            <p>Thời gian giao hàng: 3-5 ngày làm việc</p>
          </div>

          {/* Nút mua và thêm vào giỏ hàng */}
          <div className="flex space-x-4">
            <button className="bg-primary text-white px-8 py-3 rounded-lg text-lg bg-primary-700 hover:bg-primary-300">
              Mua Ngay
            </button>
            <button className="border border-primary text-primary px-8 py-3 rounded-lg text-lg hover:bg-primary-700 hover:text-light-100">
              Thêm vào Giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Ngăn cách */}
      <div className="border-t-4 border-gray-400 my-8"></div>

      {/* Phần MÔ TẢ SẢN PHẨM - Nhỏ lại */}
      <div className="mt-4 text-sm">
        <h1 className="text-xl font-bold mb-4">MÔ TẢ SẢN PHẨM</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Cột bên trái: Hình ảnh sản phẩm */}
          <div className="flex justify-center">
            <Image
              src={`http://localhost:3200/uploads/books/${product.cover_image}`}
              alt={product.title}
              width={200}
              height={300}
              className="object-cover mb-4"
            />
          </div>
          
          {/* Cột bên phải: Thông tin chi tiết sản phẩm */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Thông tin sản phẩm</h2>
            <p><strong>Tác giả:</strong> {product.author}</p>
            {/* <p><strong>Dịch giả:</strong> {product.translator || "Không có"}</p> */}
            <p><strong>Thể loại:</strong> {product.categoryID}</p>
            <p><strong>Kích thước:</strong> 13x20 cm</p>
            <p><strong>Nhà xuất bản:</strong> Nhà xuất bản Trẻ</p>
            <p><strong>Thương hiệu:</strong> DualBooks</p>
            <p><strong>Giá bìa:</strong> {(product.price * 1000).toLocaleString("vi-VN") + " đ"}</p>
            <p><strong>Mã code:</strong> 8932000123456</p>
            <p><strong>Loại bìa:</strong> Bìa mềm</p>
            <p><strong>Số trang:</strong> 320</p>
            <p><strong>Ngày phát hành:</strong> 2022-10-15</p>

            {/* Giới thiệu cuốn sách */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Giới thiệu sách</h2>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ngăn cách */}
      <div className="border-t-4 border-gray-400 my-8"></div>

      {/* Phần Đánh giá sản phẩm */}
      <div className="mt-4">
        <h1 className="text-xl font-bold mb-4">ĐÁNH GIÁ SẢN PHẨM</h1>

        {/* Chọn số sao */}
        <div className="flex items-center mb-4">
          <span className="mr-4">Chọn đánh giá: </span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
              onClick={() => handleRatingChange(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Form bình luận */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleAddComment(formData.get("name") as string, formData.get("comment") as string);
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Tên của bạn"
            className="border p-2 mb-2 w-full"
            required
          />
          <textarea
            name="comment"
            placeholder="Viết bình luận của bạn"
            className="border p-2 mb-2 w-full"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Gửi bình luận
          </button>
        </form>
      </div>

      {/* Ngăn cách */}
      <div className="border-t-4 border-gray-400 my-8"></div>

      {/* Phần Bình luận */}
      <div className="mt-4">
        <h1 className="text-xl font-bold mb-4">BÌNH LUẬN</h1>

        {/* Danh sách bình luận */}
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <h2 className="text-lg font-semibold">{comment.name}</h2>
              <p className="text-gray-600">{comment.comment}</p>
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xl ${star <= comment.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
