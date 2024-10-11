'use client';

import React, { useState } from 'react';

// Define the interface for the customer data.
interface CustomerFormData {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    created_at: string;
    updated_at: string;
}

interface Errors {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
}

const CustomerProfilePage = () => {
    const [formData, setFormData] = useState<CustomerFormData>({
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        created_at: "",
        updated_at: "",
    });

    const [errors, setErrors] = useState<Errors>({});

    // Handle input changes.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Validate form fields.
    const validateForm = () => {
        const newErrors: Errors = {};

        if (!formData.name) {
            newErrors.name = "Họ và tên không được để trống";
        }
        if (!formData.email) {
            newErrors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }
        if (!formData.phone) {
            newErrors.phone = "Số điện thoại không được để trống";
        } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
            newErrors.phone = "Số điện thoại phải bao gồm 10 hoặc 11 chữ số";
        }
        if (!formData.address) {
            newErrors.address = "Địa chỉ không được để trống";
        }

        return newErrors;
    };

    // Handle form submission.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Customer profile data submitted:', formData);
            // Here, you would typically send the form data to a server or database.
            setErrors({});
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <div className="bg-white w-11/12 lg:w-3/4 xl:w-1/2 shadow-lg rounded-lg p-6">
                {/* Header Section */}
                <div className="flex items-center mb-6 border-b border-gray-300 pb-4">
                    <img
                        src="https://via.placeholder.com/100"
                        alt="Profile"
                        className="rounded-full h-20 w-20 object-cover mr-4"
                    />
                    <div>
                        <h2 className="text-xl font-bold">Thông tin khách hàng</h2>
                        <p className="text-sm text-gray-600">Mã khách hàng: {formData.id}</p>
                    </div>
                </div>

                {/* Customer Information Form */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    {/* Full Name Field */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Họ và tên</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="name"
                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="@example.com"
                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Phone Number Field */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Số điện thoại</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="0912345678"
                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    {/* Address Field */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh"
                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>

                    {/* Created At Field */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Ngày tạo</label>
                        <input
                            type="text"
                            name="created_at"
                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.created_at}
                            disabled
                        />
                    </div>

                    {/* Updated At Field */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Ngày cập nhật</label>
                        <input
                            type="text"
                            name="updated_at"
                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.updated_at}
                            disabled
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end col-span-1 md:col-span-2">
                        <button className="bg-[rgb(175,104,62)] text-white px-4 py-2 rounded-lg mr-2 hover:bg-opacity-90">
                            Lưu Thông Tin
                        </button>
                        <button type="reset" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerProfilePage;
