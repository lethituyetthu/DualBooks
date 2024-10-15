"use client";

import React, { useEffect, useState } from "react";
import useFetchCustomer from "../hook/useFetchCustomer";
import Link from "next/link";
// Define the interface for the customer data.
interface FormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password?: string;
}

const CustomerProfilePage = () => {
  const {edit,fetchCustomer, errors} = useFetchCustomer()

  const [formData, setFormData] = useState<FormData>({
    id:"",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Giả sử bạn có ID của khách hàng trong localStorage
    const customer = JSON.parse(localStorage.getItem("customer") || "{}");
    if (customer.id) {
      fetchCustomer(customer.id).then((data) => {
        if (data) {
          setFormData({
            id: data._id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
          });
        }
      });
    }
  }, [fetchCustomer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    console.log(formData,"trang prpfile")
    await edit(formData.id, formData)
   
    
  };

  return (
    <div className=" bg-light-50 flex items-center justify-center py-2">
      <div className="bg-white  lg:w-3/4 xl:w-1/2 shadow-lg rounded-lg p-6">
        {/* Header Section */}
        <div className="flex items-center my-6 border-b border-gray-300 pb-4">
          <h2 className="text-xl font-bold">Thông tin khách hàng</h2>
          
        </div>

        {/* Customer Information Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Full Name Field */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="@example.com"
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="0912345678"
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Address Field */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Địa chỉ nhận hàng
            </label>
            <input
              type="text"
              name="address"
              placeholder="123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh"
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end col-span-1 md:col-span-2">
            <button type="submit" className="bg-[rgb(175,104,62)] text-white px-4 py-2 rounded-lg mr-2 hover:bg-opacity-90">
              Lưu Thông Tin
            </button>
            <Link href={"/customer"}
              
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
