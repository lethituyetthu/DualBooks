"use client"; // Đánh dấu component này là Client Component

import React from "react";
import useFetchCustomer from "@/app/hook/useFetchCustomer";

// Định nghĩa kiểu dữ liệu cho mỗi customer
type typeCustomer = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
};

// Định nghĩa kiểu props cho ShowCustomer
type ShowCustomerProps = {
  customers: typeCustomer[];
};

export default function ShowCustomer({ customers }: ShowCustomerProps) {
  const { toggleCustomerStatus } = useFetchCustomer();


  // Hàm xử lý chuyển trạng thái của khách hàng
  const handleToggleStatus = async (customerId: string) => {
    try {
      await toggleCustomerStatus(customerId); // Gọi hàm toggle trạng thái
      window.location.reload()
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };
  if (customers.length === 0) {
    return <div>Không có khách hàng nào!</div>;
  }
  console.log(customers)
  return (
    <div className="bg-white shadow-md">
      <table className="w-full table-auto border-separate border-spacing-0 rounded-tl-xl rounded-tr-lg">
        <thead>
          <tr className="bg-[#AF683E] text-left text-white border border-white rounded-tl-lg rounded-tr-lg">
            <th className="p-4 border border-white">Khách Hàng</th>
            <th className="p-4 border border-white">Email</th>
            <th className="p-4 border border-white">Số Điện Thoại</th>
            <th className="p-4 border border-white">Địa Chỉ</th>
            <th className="p-4 text-right border border-white rounded-tr-lg"></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr
              key={customer._id}
              className={`border border-white ${
                index % 2 === 0 ? "bg-[#FBF3E9]" : "bg-[#F4DCC8]"
              }`}
            >
              <td className="p-4 border border-white">{customer.name}</td>
              <td className="p-4 border border-white">{customer.email}</td>
              <td className="p-4 border border-white">{customer.phone}</td>
              <td className="p-4 border border-white">{customer.address}</td>
              <td className="p-4 text-right flex justify-center items-center border border-white">
                

                {customer.status === "blocked" ? (
                  <button
                    className="bg-orange-500 text-white p-2 rounded flex items-center space-y-4"
                    onClick={() => handleToggleStatus(customer._id)}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                ) : (
                  <button
                    className="bg-gray-500 text-white p-2 rounded flex items-center space-y-4"
                    onClick={() => handleToggleStatus(customer._id)}
                  >
                    <i className="fas fa-eye-slash"></i>
                  </button>
                )}
               {/*  <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleToggleStatus(customer._id)} // Gọi hàm toggle trạng thái                                  >
                >
                  <i className="fa-solid fa-sync"></i>
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
