// useHandlePlaceOrder.ts
import { useRouter } from "next/navigation";
import useFetchBook from "@/app/hook/useFetchBook";


type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    cover_image: string;
    category: string;
  };
  
// Custom Hook để xử lý đặt hàng
const useHandlePlaceOrder = (cartItems: CartItem[],  totalQuantity: number, totalPrice: number) => {
  const router = useRouter();
  const { fetchProductStock } = useFetchBook();

  // Hàm xử lý khi đặt hàng
  const handlePlaceOrder = async () => {
    for (const item of cartItems) {
        const stock = await fetchProductStock(item.id); // Lấy số lượng tồn kho từ API
        if (item.quantity > stock) {
          const book = await fetchProductStock(item.id); // Lấy thông tin sản phẩm để hiển thị thông báo
          alert(
            `Sản phẩm "${item.title}" không đủ số lượng trong kho. Tồn kho chỉ có ${book} sản phẩm.`
          );
          return; // Dừng quá trình thanh toán nếu có sản phẩm hết hàng
        }
      }
    // Nếu không có lỗi tồn kho, thực hiện thanh toán
    const data = JSON.stringify({
      cartItems, // Thông tin giỏ hàng
      totalQuantity: cartItems.reduce((total, item) => total + item.quantity, 0), // Tổng số lượng sản phẩm
      totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 1000, // Tổng tiền
    });

    const encodedData = encodeURIComponent(data); // Mã hóa dữ liệu để truyền qua URL
    router.push(`/customer/checkout?data=${encodedData}`); // Điều hướng sang trang thanh toán với dữ liệu

     // Call the success callback (e.g., clear cart or show success message)
  };

  return  handlePlaceOrder ;
};

export default useHandlePlaceOrder;
