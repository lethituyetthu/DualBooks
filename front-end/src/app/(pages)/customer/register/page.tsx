"use client";

import Link from "next/link";
import React, { useState } from "react";
import InputField from "../../../../components/ui/input";
import useFetchCustomer from "../../../hook/useFetchCustomer";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}
const RegisterPage = () => {
  const { register, errors, successMessage } = useFetchCustomer();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [isRegistered, setIsRegistered] = useState<boolean>(false);  // Trạng thái đăng ký thành công
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [verifyErrors, setVerifyErrors] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit được gọi"); 
    try {
      const response = await register(formData);
      if (response.ok) {
        setIsRegistered(true);
        console.log("isRegistered:", true); // Debug giá trị isRegistered
      } else {
        const data = await response.json();
        setVerifyErrors(data.message || "Đã xảy ra lỗi khi đăng ký.");
      }
    } catch{
      setVerifyErrors("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
    }
  };
  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const verifyEmail = async () => {
    try {
      const response = await fetch("http://localhost:3200/customers/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          verificationCode,
        }),
      });
  
      if (response.ok) {
        setIsVerified(true); // Đánh dấu email đã xác minh thành công
        setVerifyErrors("");
        window.location.href = "/customer/login";
      } else {
        const data = await response.json();
        if (response.status === 409) {
          setVerifyErrors("Email đã được sử dụng. Vui lòng chọn email khác.");
        } else {
          setVerifyErrors(data.message || "Đã xảy ra lỗi khi xác minh.");
        }
      }
    } catch{
      setVerifyErrors("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
    }
  };

  return (
    <div className="flex justify-between p-8 max-w-4xl mx-auto">
      {/* Left Side - Register Form */}
      <div className="flex-1 p-8 flex flex-col items-center border border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-3xl font-bold mb-6 text-primary-600 font-itim">
          Đăng Ký
        </h2>
          {/* Hiển thị thông báo thành công */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
          {/* Hiển thị lỗi tổng quát nếu có */}
    {errors.general && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
        {errors.general}
      </div>
    )}
        <form className="flex flex-col w-full mb-6" onSubmit={handleSubmit}>
          {/* Name Field */}
          <InputField
            type="text"
            name="name"
            placeholder="Tên"
            value={formData.name}
            onChange={handleChange}
            error={errors.name }
          />

          {/* Email Field */}
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />


          {/* Phone Field */}
          <InputField
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone }
          />

          {/* Address Field */}
          <InputField
            type="text"
            name="address"
            placeholder="Địa chỉ nhận hàng"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />

          {/* Password Field */}
          <InputField
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

            <button
            type="submit"
            className="p-3 bg-primary-400 text-white rounded-sm hover:bg-opacity-90"
          >
            Đăng Ký Ngay
          </button>
        </form>

        {/* Hiển thị mã xác minh khi đăng ký thành công */}
        {isRegistered && !isVerified && (
  <div>
    <input
      type="text"
      value={verificationCode}
      onChange={handleVerificationChange}
      placeholder="Nhập mã xác minh"
      className="p-3 border rounded mt-4"
    />
    {verifyErrors && <p className="text-red-500">{verifyErrors}</p>}
    <button
      onClick={verifyEmail}
      className="p-3 bg-primary-400 text-white rounded-sm hover:bg-opacity-90"
    >
      Xác nhận
    </button>
  </div>
)}
        <p className="mb-4">Hoặc sử dụng tài khoản</p>
        <div className="flex space-x-4">
          <button className="p-3 border border-[#F2B05E] text-[#F2B05E] rounded-md hover:bg-opacity-90">
            Facebook
          </button>
          <button className="p-3 border border-[#F2B05E] text-[#F2B05E] rounded-md hover:bg-opacity-90">
            Twitter
          </button>
          <button className="p-3 border border-[#F2B05E] text-[#F2B05E] rounded-md hover:bg-opacity-90">
            Instagram
          </button>
        </div>
      </div>

      {/* Right Side - "HELLO" message */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center rounded-lg shadow-md text-center bg-primary-400">
        <h2 className="text-3xl font-itim font-bold mb-4 text-white">HELLO</h2>
        <p className="mb-6 text-white">
          Nếu bạn đã có tài khoản, hãy đăng nhập tại đây
        </p>
        <Link
          href={"/customer/login"}
          className="p-3 bg-light-100 text-dark-700 rounded-sm hover:bg-opacity-90"
        >
          Tham Gia Ngay
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
