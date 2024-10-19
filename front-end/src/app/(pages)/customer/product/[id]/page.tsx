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

  const handleAddProduct = () => {
    const cart = localStorage.getItem("cart");
    const cartItems = cart ? JSON.parse(cart) : [];
    
    // Check if the product already exists in the cart
    const existingProduct = cartItems.find((item: { id: string; }) => item.id === product?.id);
    
    if (existingProduct) {
      // If it exists, update the quantity
      existingProduct.quantity += quantity;
    } else {
      // If not, add the product to the cart
      cartItems.push({ ...product, quantity });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));
    alert("Sản phẩm đã được thêm vào giỏ hàng");
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
            <button onClick={handleAddProduct} className="border border-primary text-primary px-8 py-3 rounded-lg text-lg hover:bg-primary-700 hover:text-light-100">
              Thêm vào Giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Ngăn cách */}
      <div className="border-t-4 border-gray-400 my-8"></div>

      {/* Phần MÔ TẢ SẢN PHẨM */}
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
          <span>Chọn đánh giá: </span>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              onClick={() => handleRatingChange(index + 1)}
              className={`cursor-pointer text-2xl mx-1 ${
                rating >= index + 1 ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Danh sách bình luận */}
        <div className="mb-4">
          {comments.map((comment, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <h3 className="font-semibold">{comment.name}</h3>
              <p className="text-yellow-500">
                {Array.from({ length: comment.rating }, () => "★").join("")}
              </p>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>

        {/* Form thêm bình luận */}
        <div className="border-t-2 pt-4">
          <h3 className="text-lg font-semibold mb-2">Thêm bình luận của bạn</h3>
          <input
            type="text"
            placeholder="Tên của bạn"
            className="w-full p-2 border rounded mb-4"
          />
          <textarea
            placeholder="Nội dung bình luận"
            className="w-full p-2 border rounded mb-4"
            rows={4}
          />
          <button
            onClick={() => handleAddComment("Tên", "Bình luận mẫu")} // Tạm thời mock dữ liệu
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Gửi bình luận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
