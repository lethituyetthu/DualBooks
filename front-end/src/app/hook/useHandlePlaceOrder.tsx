// useHandlePlaceOrder.ts
import { useRouter } from "next/navigation";
import useFetchBook from "@/app/hook/useFetchBook";
import { useSnackbar } from 'notistack';


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

  const customerToken = localStorage.getItem("customer");

    // Kiểm tra khách hàng đã đăng nhập
  
  const router = useRouter();
  const { fetchProductStock } = useFetchBook();
  const { enqueueSnackbar } = useSnackbar();

   // Hàm xử lý khi đặt hàng
   const handlePlaceOrder = async () => {
    if (!customerToken) {
      enqueueSnackbar(`bạn cần đăng nhập để mua sản phẩm`, {
      variant: "error",
      autoHideDuration: 2000,
    });
      return;
    }
    
    for (const item of cartItems) {
      try {
        // Lấy số lượng tồn kho từ API
        const stock = await fetchProductStock(item.id);

        // Kiểm tra nếu số lượng giỏ hàng lớn hơn số lượng tồn kho
        if (item.quantity > stock) {
          // Sử dụng notistack để hiển thị thông báo lỗi
          enqueueSnackbar(
            `Sản phẩm "${item.title}" không đủ số lượng trong kho. Tồn kho chỉ có ${stock} sản phẩm.`, 
            { variant: 'error' } // Thông báo lỗi (variant: 'error')
          );
          return; // Dừng quá trình thanh toán nếu có sản phẩm hết hàng
        }
      } catch (error) {
        // Hiển thị thông báo lỗi nếu có lỗi trong quá trình kiểm tra tồn kho
        enqueueSnackbar("Có lỗi xảy ra khi kiểm tra tồn kho.", { variant: 'error' });
        return;
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
