import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface BookDetailProps {
  title: string;
  description: string;
  price: number;
  cover_image: string;
  stock: number;
  id: string; // Assuming each product has an `id`
}

const BookDetail = ({
  title,
  description,
  price,
  cover_image,
  stock,
  id,
}: BookDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);
  const [viewCount, setViewCount] = useState<number>(0);
  
  // To track if the component is mounted to avoid double-increments in development mode
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true; // Mark as mounted on first render
      return;
    }

    // Retrieve the current view count for this specific product from localStorage
    const currentViewCount = localStorage.getItem(`viewCount_${id}`);
    let newViewCount = currentViewCount ? parseInt(currentViewCount) : 0;

    // Increment the view count by 1 for this product
    newViewCount += 1;

    // Update the view count in state and localStorage
    setViewCount(newViewCount);
    localStorage.setItem(`viewCount_${id}`, newViewCount.toString());
  }, [id]); // Depend on `id` to trigger when the product changes

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddProduct = () => {
    const product = {
      title,
      price,
      quantity,
      cover_image,
    };

    const existingCart = localStorage.getItem("cart");
    const cart: Array<{ title: string; price: number; quantity: number; cover_image: string }> =
      existingCart ? JSON.parse(existingCart) : [];

    const existingProductIndex = cart.findIndex(
      (item) => item.title === product.title
    );

    if (existingProductIndex !== -1) {
      // Notify user that the product is already in the cart
      setNotification("Sản phẩm đã có trong giỏ hàng!");
    } else {
      cart.push({ ...product });
      localStorage.setItem("cart", JSON.stringify(cart));
      setNotification("Sản phẩm đã thêm vào giỏ hàng!");
    }

    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-20 border-spacing-6 bg-white border border-gray-200 p-6 rounded-lg shadow-md">
      {/* Image Section */}
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
          {(price * 1000).toLocaleString("vi-VN") + " đ"}
        </div>

        {/* Stock Information */}
        <div className="flex items-center mb-4">
          <span
            className={`text-sm ${
              stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {stock > 0 ? "Còn hàng" : "Hết hàng"}
          </span>
        </div>

        {/* Quantity Section */}
        <span className="mr-4">Số lượng:</span>
        <div className="flex items-center mb-4 border w-fit rounded-sm p-0 ">
          <button
            onClick={handleDecrease}
            className="px-4 py-2 bg-light-200 text-gray-600 rounded-l"
          >
            -
          </button>
          <span className="px-4 py-[8px] ">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-4 py-2 bg-light-200 text-gray-600 rounded-r"
          >
            +
          </button>
        </div>

        {/* Additional Information */}
        <div className="flex items-center mb-4">
          <span className="text-green-600 mr-4">Miễn phí vận chuyển</span>
          <span className="text-red-500">Chính hãng 100%</span>
        </div>

        {/* View Count */}
        <div className="mb-4 text-sm text-gray-500">
         Tăng Lượt xem: {viewCount}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="bg-primary-400 hover:bg-primary-300 text-white px-6 py-2 rounded">
            Mua Ngay
          </button>
          <button
            onClick={handleAddProduct}
            className="bg-transparent border border-primary-600 hover:bg-primary-300 hover:text-light-100 text-primary-600 px-6 py-2 rounded"
          >
            Thêm vào giỏ hàng
          </button>
        </div>

        {/* Notification for added product */}
        {notification && (
          <div className="mt-2 p-2 bg-green-100 text-green-700 rounded-md text-center">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;

