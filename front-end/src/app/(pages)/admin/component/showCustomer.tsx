"use client"; 

import React from 'react';

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ShowCustomerProps {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  deleteCustomer: (id: string) => void;
}

export default function ShowCustomer({ customers, loading, error, deleteCustomer }: ShowCustomerProps) {
  
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Có lỗi xảy ra: {error}</div>;
  }

  return (
    <>
      {customers.map((customer, index) => (
        <tr
          key={index}
          className={`border border-white ${index % 2 === 0 ? 'bg-[#FBF3E9]' : 'bg-[#F4DCC8]'}`}
        >
          <td className="p-4 border border-white">{customer.name}</td>
          <td className="p-4 border border-white">{customer.email}</td>
          <td className="p-4 border border-white">{customer.phone}</td>
          <td className="p-4 border border-white">{customer.address}</td>
          <td className="p-4 text-right flex justify-center items-center border border-white">
            <button 
              className="text-red-500 hover:text-red-700" 
              onClick={() => deleteCustomer(customer._id)}
            >
              <i className="fa-solid fa-circle-minus"></i>
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
