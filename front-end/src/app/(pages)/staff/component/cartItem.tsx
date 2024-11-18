import React, { useEffect, useState } from "react";

// Định nghĩa kiểu dữ liệu cho các props của CartItem
interface CartItemProps {
  id: string; // ID của sản phẩm
  product: string; // Tên sản phẩm
  quantity: number; // Số lượng sản phẩm
  price: number; // Giá sản phẩm
  onQuantityChange: (id: string, newQuantity: number) => void; // Hàm callback khi thay đổi số lượng
  onDelete: (id: string) => void; // Hàm callback khi xóa sản phẩm
}

// Component hiển thị một sản phẩm trong giỏ hàng
const CartItem: React.FC<CartItemProps> = ({
  id,
  product,
  quantity,
  price,
  onQuantityChange,
  onDelete,
}) => {
  // State để quản lý số lượng sản phẩm hiện tại
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  // Cập nhật state `currentQuantity` khi `quantity` từ props thay đổi
  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity]);

  // Hàm giảm số lượng sản phẩm, xóa sản phẩm nếu số lượng = 1
  const decrementQuantity = () => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1; // Giảm số lượng
      setCurrentQuantity(newQuantity); // Cập nhật state
      onQuantityChange(id, newQuantity); // Gọi callback với số lượng mới
    } else {
      onDelete(id); // Nếu số lượng = 1, gọi hàm xóa sản phẩm
    }
  };

  // Hàm tăng số lượng sản phẩm
  const incrementQuantity = () => {
    const newQuantity = currentQuantity + 1; // Tăng số lượng
    setCurrentQuantity(newQuantity); // Cập nhật state
    onQuantityChange(id, newQuantity); // Gọi callback với số lượng mới
  };

  // Tính tổng giá tiền cho sản phẩm này
  const totalPrice = currentQuantity * price;

  return (
    <div className="grid grid-cols-5 gap-4 items-center py-2 border-b">
      {/* Hiển thị tên và giá sản phẩm */}
      <div className="col-span-2">
        {product}
        <div className="text-dark-200">
          {/* Giá sản phẩm được định dạng với đơn vị VNĐ */}
          Giá: {(price * 1000).toLocaleString("vi-VN") + " đ"}
        </div>
      </div>

      {/* Điều khiển số lượng sản phẩm */}
      <div className="flex items-center gap-2">
        {/* Nút giảm số lượng */}
        <button
          className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={decrementQuantity}
        >
          -
        </button>
        {/* Hiển thị số lượng hiện tại */}
        <span className="px-4">{currentQuantity}</span>
        {/* Nút tăng số lượng */}
        <button
          className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={incrementQuantity}
        >
          +
        </button>
      </div>

      {/* Hiển thị tổng giá tiền cho sản phẩm */}
      <div>{(totalPrice * 1000).toLocaleString("vi-VN") + " đ"}</div>

      {/* Nút xóa sản phẩm */}
      <button className="text-red-500" onClick={() => onDelete(id)}>
        ✖
      </button>
    </div>
  );
};

export default CartItem;
