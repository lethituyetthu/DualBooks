import { useState } from "react";
import Image from "next/image";
import useAddToCart from "@/app/hook/useAddToCard";
import { useRouter } from "next/navigation";
import useHandlePlaceOrder from "@/app/hook/useHandlePlaceOrder";

interface BookDetailProps {
  title: string;
  description: string;
  price: number;
  cover_image: string;
  stock: number;
  id: string;
  views: string;
}

const BookDetail = ({
  title,
  description,
  price,
  cover_image,
  stock,
  id,
  views,
}: BookDetailProps) => {
  const router = useRouter()

  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);

  const addToCart = useAddToCart(() => {
    // Optionally update UI or cart count
    setNotification("Sản phẩm đã được thêm vào giỏ hàng!");
    setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
  });

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  /* const handlePlaceOrder = () => {
    const product = {
      id,
      title,
      price,
      cover_image,
      quantity,
    };
  
    const data = JSON.stringify({
      cartItems : [product], // Thông tin giỏ hàng
      totalQuantity: quantity , // Tổng số lượng sản phẩm
      totalPrice: quantity*price, // Tổng tiền
    });

    const encodedData = encodeURIComponent(data); // Mã hóa dữ liệu để truyền qua URL

    router.push(`/customer/checkout?data=${encodedData}`);
    //console.log(encodedData)
    // Điều hướng sang trang thanh toán với dữ liệu
  }; */

  const handlePlaceOrder = useHandlePlaceOrder([{ id, title, price, cover_image, quantity, category: '' }], quantity, quantity*price)
  const handleAddToCart = () => {
    const product = {
      id,
      title,
      price,
      cover_image,
      quantity,
    };
  
    // Log the product details
    //console.log("Product added to cart:", product.id);
  
    // Call the addToCart function
    addToCart(product);
  };
  return (
    <div className="flex flex-col lg:flex-row gap-8 py-10 px-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Image Section */}
      <div className="w-full lg:w-1/3">
        <Image
          src={`http://localhost:3200/uploads/books/${cover_image}`}
          alt={title}
          width={320}
          height={400}
          className="w-full rounded-lg object-cover shadow"
        />
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-2/3">
        <h1 className="text-3xl font-bold font-itim text-primary-600 mb-4">
          {title}
        </h1>

        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

        <div className="text-primary-600 text-3xl font-semibold mb-6">
          {(price * 1000).toLocaleString("vi-VN") + " đ"}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <span className="text-sm text-gray-500">
            Tồn kho:{" "}
            <span className="font-semibold text-gray-700">{stock}</span>
          </span>
          <span className="text-sm text-gray-500">
            Lượt xem:{" "}
            <span className="font-semibold text-gray-700">{views}</span>
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-green-600 font-medium">
            Miễn phí vận chuyển
          </span>
          <span className="text-red-500 font-medium">Chính hãng 100%</span>
        </div>

        {/* Quantity Section */}
        <div className="mb-6">
          <span className="block text-gray-800 font-medium mb-2">Số lượng:</span>
          <div className="flex items-center border rounded-md overflow-hidden w-fit">
            <button
              onClick={handleDecrease}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
            >
              -
            </button>
            <span className="px-6 py-2 text-gray-700 font-medium">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
          onClick={handlePlaceOrder} className="px-6 py-3 bg-primary-400 hover:bg-primary-300 text-white font-medium rounded-md shadow transition">
            Mua Ngay
          </button>
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-white border border-primary-500 hover:bg-primary-100 text-primary-600 font-medium rounded-md shadow transition"
          >
            Thêm vào giỏ hàng
          </button>
        </div>

        {/* Notification for added product */}
        {notification && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md shadow text-center">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
