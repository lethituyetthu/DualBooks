import { useState } from "react";
import Image from "next/image";

interface BookDetailProps {
  title: string;
  description: string;
  price: number;
  cover_image: string;
  stock: number;
}

const BookDetail = ({
  title,
  description,
  price,
  cover_image,
  stock,
}: BookDetailProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-[30px] py-20 border-spacing-6 bg-white border border-gray-200 p-6 rounded-lg shadow-md">
      {/* Phần hình ảnh */}
      <div className="w-full lg:w-1/3">
        <Image
          src={`http://localhost:3200/uploads/books/${cover_image}`}
          alt={title}
          width={320}
          height={400}
          className="w-full"
        />
      </div>
      <div className="w-full lg:w-2/3">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-red-500 text-2xl font-bold mb-4">
          {(price * 1000).toLocaleString("vi-VN") + "đ"}
        </div>

        {/* Thông tin stock và khuyến mãi */}
        <div className="flex items-center mb-4">
          <span
            className={`text-sm ${
              stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {stock > 0 ? "Còn hàng" : "Hết hàng"}
          </span>
        </div>

        {/* Phần số lượng */}
        <div className="flex items-center mb-4">
          <span className="mr-4">Số lượng:</span>
          <button
            onClick={handleDecrease}
            className="px-4 py-2 bg-light-200 text-gray-600 rounded-l"
          >
            -
          </button>
          <span className="px-4 py-[7px] border">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-4 py-2 bg-light-200 text-gray-600 rounded-r"
          >
            +
          </button>
        </div>

        {/* Thông tin thêm */}
        <div className="flex items-center mb-4">
          <span className="text-green-600 mr-4">Miễn phí vận chuyển</span>
          <span className="text-red-500">Chính hãng 100%</span>
        </div>

        {/* Nút hành động */}
        <div className="flex gap-4">
          <button className="bg-primary-400 hover:bg-primary-300 text-white px-6 py-2 rounded">
            Mua Ngay
          </button>
          <button className="bg-transparent border border-primary-600 hover:bg-primary-300 hover:text-light-100  text-primary-600 px-6 py-2 rounded">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
