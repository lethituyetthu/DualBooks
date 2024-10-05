'use client';

import React, { useState } from 'react';

interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface LoginErrors {
    email?: string;
    password?: string;
}

const LoginPage = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState<LoginErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        const newErrors: LoginErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email không được để trống';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu không được để trống';
        }

        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Login form data submitted:', formData);
            setFormData({
                email: '',
                password: '',
                rememberMe: false,
            });
            setErrors({});
        }
    };

    return (
        <div className="flex justify-between p-8 max-w-4xl mx-auto">
            {/* Left Side - Login Form */}
            <div className="flex-1 p-8 flex flex-col items-center border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-[#F2B05E]">Đăng Nhập</h2>
                <form className="flex flex-col w-full mb-6" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        className="p-3 mb-1 border rounded-md border-[#F2B05E]" 
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}

                    {/* Password Field */}
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Mật khẩu" 
                        className="p-3 mb-1 border rounded-md border-[#F2B05E]" 
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center mb-4">
                        <input 
                            type="checkbox" 
                            name="rememberMe" 
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label htmlFor="rememberMe">Ghi nhớ tôi</label>
                    </div>

                    {/* Forgot Password */}
                    <p className="mb-4 text-right text-[#F2B05E] cursor-pointer hover:underline">
                        Quên mật khẩu?
                    </p>

                    {/* Submit Button */}
                    <button className="p-3 bg-[#D98B48] text-white rounded-full hover:bg-opacity-90">
                        Đăng Nhập
                    </button>
                </form>
            </div>

            {/* Right Side - Join DUALS BOOKS */}
            <div className="flex-1 p-8 flex flex-col items-center justify-center rounded-lg shadow-md text-center" style={{ backgroundColor: '#F2B05E' }}>
                <h2 className="text-2xl font-bold mb-4 text-white">Tham Gia cùng DUALS BOOKS</h2>
                <p className="mb-6 text-white">Nếu bạn chưa có tài khoản, hãy đăng ký ngay.</p>
                <button className="p-3 bg-[#D98B48] text-white rounded-full hover:bg-opacity-90">
                    Đăng Ký Ngay Bây Giờ
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
