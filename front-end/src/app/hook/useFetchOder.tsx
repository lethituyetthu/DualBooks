import { useState } from "react";
import OderItem from "../(pages)/staff/component/oderItem";

interface OrderItem {
  book_id: string;
  quantity: number;
  price: number;
}

interface Order {
  customer_id?: string;
  staffId: string;
  order_date: Date;
  order_status:
    | "Chờ xác nhận"
    | "Đã xác nhận"
    | "Đang giao hàng"
    | "Hoàn thành"
    | "Đã hủy";
  payment_status:
    | "Chưa thanh toán"
    | "Đang xử lý thanh toán"
    | "Đã thanh toán"
    | "Thanh toán thất bại";
  payment_method: "Tiền mặt" | "Chuyển khoản";
  shipping_address?: string;
  total_amount: number;
  total_quantity: number;
  order_type: "online" | "offline";
  customerFeedback?: string;
}

export default function useFetchOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]); // State to store orders
  const [orderDetail, setOrderDetail] = useState<Order | null>(null); // State to store a single order detail

  const addOrder = async (orderData: Order) => {
    setLoading(true);
    setError(null);
    console.log(orderData)

    try {
      const response = await fetch("http://localhost:3200/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.data.total_amount)
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addOrderItem = async (orderId: string, orderItemData: OrderItem) => {
    setLoading(true);
    setError(null);
    console.log(orderItemData)

    try {
      const response = await fetch(
        `http://localhost:3200/orders/${orderId}/order-items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderItemData),
        }
      );


      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();

      console.log(data)
      if (data && data._id) {
        return data._id;
      } else {
        throw new Error("Không nhận được ID của đơn hàng từ phản hồi.");
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getOrderDetail = async (orderId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3200/orders/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setOrderDetail(data); // Set the fetched order detail in state
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3200/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setOrders(data); // Set the fetched orders in state
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addOrder,
    addOrderItem,
    getOrderDetail,
    getAllOrders,
    orders, 
    orderDetail, 
    loading,
    error,
  };
}
