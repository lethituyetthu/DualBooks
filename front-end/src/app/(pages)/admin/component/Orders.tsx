"use client";
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Order } from '../models/Order'; // Ensure this import is correct

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); // State for error handling

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get<{ data: Order[] }>(`http://localhost:3200/orders`);
                console.log('Fetched orders:', response.data.data);
                setOrders(response.data.data); // Update state with fetched orders
            } catch (error) {
                const err = error as AxiosError;
                console.error("Error fetching orders:", err.response ? err.response.data : err.message);
                setError("Failed to fetch orders. Please try again later."); // Set error state
            } finally {
                setLoading(false); // Set loading to false once the data is fetched
            }
        };

        fetchOrders(); // Call the fetchOrders function
    }, []); // Empty dependency array ensures this effect runs once on mount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>; // Display error message
    }

    return (
        <div className="bg-white text-gray-800 shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="font-semibold">Đơn Hàng</h3>
                    <p className="text-xl font-bold">{orders.length}</p>
                </div>
                <div className="ml-4 flex items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center border border-[#8280FF] rounded-lg">
                        <i className="fas fa-shopping-cart text-[#8280FF]"></i>
                    </div>
                </div>
            </div>
            <div className="flex items-center mt-2">
                <span className="mr-2">📈</span>
                <p className="text-green-400">Tăng: +N/A % so với hôm qua</p>
            </div>
            {/* <div className="mt-4">
                {orders.map(order => (
                    <div key={order.id} className="border-b py-2">
                        <h4 className="font-semibold">{order.status} - {order.total_amount} VNĐ</h4>
                        <p>Ngày đặt: {new Date(order.order_date).toLocaleDateString()}</p>
                        <p>Địa chỉ giao hàng: {order.shipping_address}</p>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default Orders;
