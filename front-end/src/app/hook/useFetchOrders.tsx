import { useState, useEffect, useCallback } from "react";

// Định nghĩa kiểu dữ liệu cho một mục trong danh sách sản phẩm của đơn hàng
export interface typeOrderItem {
  id: string;
  bookId: string;
  bookTitle: string;
  bookImg: string;
  quantity: number;
  price: number;
}

// Định nghĩa kiểu dữ liệu cho khách hàng
export interface typeCustomer {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone: string;
}

// Định nghĩa kiểu dữ liệu cho chi tiết đơn hàng
export interface typeOrderDetail {
  id: string;
  order_type: string;
  order_date: string;
  order_status: string;
  payment_status: string;
  shipping_address: string;
  total_amount: number;
  total_quantity: number;
  customer_feedback: string | null;
  order_items: typeOrderItem[];
  customerInfo?: typeCustomer;
}

// Định nghĩa kiểu dữ liệu cho đơn hàng tổng quát (không bao gồm chi tiết sản phẩm)
export interface typeOrder {
  id: string;
  order_type: string;
  order_date: string;
  order_status: string;
  payment_status: string;
  shipping_address: string;
  shipping_method:string;
  total_amount: number;
  total_quantity: number;
}

// Định nghĩa kiểu trả về cho custom hook useFetchOrders
export interface UseFetchOrdersResult {
  orders: typeOrder[];
  orderDetail: typeOrderDetail | null;
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  fetchOrderDetail: (orderId: string) => Promise<void>;
  updateOrder: (
    orderId: string,
    updatedData: Partial<typeOrderDetail>
  ) => Promise<void>;
  fetchOrdersByStatus: (status: string) => Promise<void>; // Add this line to the interface
  fetchOrdersByDate: (status: string) => Promise<void>; // Add this line to the interface
  fetchOrdersByCustomerId: (customerId: string) => Promise<void>;
  confirmOrder: (id: string) => Promise<void>;
  cancelOrder: (id: string) => Promise<void>;
}

export default function useFetchOrders(): UseFetchOrdersResult {
  const [orders, setOrders] = useState<typeOrder[]>([]);
  const [orderDetail, setOrderDetail] = useState<typeOrderDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm lấy danh sách đơn hàng từ API
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null); // Đặt lại lỗi khi bắt đầu tải
    try {
      const response = await fetch("http://localhost:3200/orders");
      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu đơn hàng!");
      }
      const result = await response.json();

      //console.log(result)
      setOrders(result); // Đặt dữ liệu đơn hàng vào state
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Hàm lấy chi tiết đơn hàng từ API theo orderId
  const fetchOrderDetail = useCallback(
    async (orderId: string): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3200/orders/${orderId}`);
        if (!response.ok) {
          throw new Error("Lỗi khi lấy chi tiết đơn hàng!");
        }
        const result = await response.json();

        setOrderDetail(result); // Đặt chi tiết đơn hàng vào state
        return result;
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },[]  );

  // Hàm cập nhật thông tin đơn hàng
  /*  const updateOrder = useCallback(
    async (orderId: string, updatedData: Partial<typeOrderDetail>) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3200/orders/${orderId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          }
        );

        if (!response.ok) {
          throw new Error("Lỗi khi cập nhật đơn hàng!");
        }

        const result: typeOrderDetail = await response.json();
        setOrderDetail(result);

        // Cập nhật danh sách đơn hàng nếu cần
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, ...updatedData } : order
          )
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    []
  ); */
  // Hàm lấy danh sách đơn hàng theo trạng thái
  const fetchOrdersByStatus = useCallback(async (status: string) => {
    setLoading(true);
    setError(null);
    try {
      // Lấy danh sách đơn hàng theo trạng thái
      const response = await fetch(
        `http://localhost:3200/orders/filter-by-status/${status}`
      );
      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu đơn hàng theo trạng thái!");
      }
      const result = await response.json();
      return result;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrdersByDate = useCallback(async (date: string) => {
    setLoading(true);
    setError(null);
    try {
      const encodedDate = encodeURIComponent(date); // Mã hóa trạng thái

      // Lấy danh sách đơn hàng theo trạng thái
      const response = await fetch(
        `http://localhost:3200/orders/filter-by-date/${encodedDate}`
      );
      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu đơn hàng theo ngày");
      }
      const result = await response.json();
      setOrders(result); // Đặt dữ liệu đơn hàng vào state\
      return result;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);
  const fetchOrdersByCustomerId = useCallback(async (customerId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3200/orders/filter-by-customer/${customerId}`
      );
      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu đơn hàng theo ID khách hàng!");
      }
      const result = await response.json();
      console.log(result);
      setOrders(result); // Đặt dữ liệu đơn hàng vào state
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmOrder = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3200/orders/confirm/${id}`, {
        method: "PUT", // Phương thức PUT cho việc cập nhật trạng thái đơn hàng
        headers: {
          "Content-Type": "application/json", // Đặt header nếu API yêu cầu JSON
        },
      });

      if (!res.ok) {
        // Nếu phản hồi không thành công
        const errorData = await res.json(); // Thử lấy thông tin chi tiết lỗi từ API
        throw new Error(
          errorData.message || "Lỗi không xác định khi xác nhận đơn hàng"
        );
      }

      const result = await res.json(); // Đọc dữ liệu phản hồi (nếu có)
      console.log("Xác nhận đơn hàng thành công:", result);
      return result; // Trả về kết quả để sử dụng nếu cần
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error);
      throw error; // Ném lỗi để xử lý bên ngoài (nếu cần)
    }
  };
  const cancelOrder = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3200/orders/cancel/${id}`, {
        method: "PUT", // Phương thức PUT cho việc cập nhật trạng thái đơn hàng
        headers: {
          "Content-Type": "application/json", // Đặt header nếu API yêu cầu JSON
        },
      });

      if (!res.ok) {
        // Nếu phản hồi không thành công
        const errorData = await res.json(); // Thử lấy thông tin chi tiết lỗi từ API
        throw new Error(
          errorData.message || "Lỗi không xác định khi huỷ đơn hàng"
        );
      }

      const result = await res.json(); // Đọc dữ liệu phản hồi (nếu có)
      console.log("huỷ đơn hàng thành công", result);
      return result; // Trả về kết quả để sử dụng nếu cần
    } catch (error) {
      console.error("Lỗi khi huỷ đơn hàng:", error);
      throw error; // Ném lỗi để xử lý bên ngoài (nếu cần)
    }
  };

  const deliverOrder = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3200/orders/deliver/${id}`, {
        method: "PUT", // Phương thức PUT cho việc cập nhật trạng thái đơn hàng
        headers: {
          "Content-Type": "application/json", // Đặt header nếu API yêu cầu JSON
        },
      });

      if (!res.ok) {
        // Nếu phản hồi không thành công
        const errorData = await res.json();
        throw new Error(
          errorData.message ||
            "Lỗi không xác định khi xác nhận giao hàng đơn hàng"
        );
      }

      const result = await res.json(); // Đọc dữ liệu phản hồi (nếu có)
      console.log("Xác nhận giao hàng thành công:", result);
      return result; // Trả về kết quả để sử dụng nếu cần
    } catch (error) {
      console.error("Lỗi khi xác nhận giao hàng đơn hàng:", error);
      throw error; // Ném lỗi để xử lý bên ngoài (nếu cần)
    }
  };

  const completeOrder = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3200/orders/complete/${id}`, {
        method: "PUT", // Phương thức PUT cho việc cập nhật trạng thái đơn hàng
        headers: {
          "Content-Type": "application/json", // Đặt header nếu API yêu cầu JSON
        },
      });

      if (!res.ok) {
        // Nếu phản hồi không thành công
        const errorData = await res.json();
        throw new Error(
          errorData.message ||
            "Lỗi không xác định khi xác nhận giao hàng đơn hàng"
        );
      }

      const result = await res.json(); // Đọc dữ liệu phản hồi (nếu có)
      console.log("Xác nhận hoàn thành đơn hàng:", result);
      return result.data; // Trả về kết quả để sử dụng nếu cần
    } catch (error) {
      console.error("Xác nhận hoàn thành đơn hàng:", error);
      throw error; // Ném lỗi để xử lý bên ngoài (nếu cần)
    }
  };

  // Gọi fetchOrders khi component lần đầu render
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    orderDetail,
    loading,
    error,
    fetchOrders,
    fetchOrderDetail,
    fetchOrdersByCustomerId,
    confirmOrder,
    cancelOrder,
    deliverOrder,
    completeOrder,
    fetchOrdersByStatus,
    fetchOrdersByDate, // Trả về hàm fetchOrdersByStatus
  };
}
