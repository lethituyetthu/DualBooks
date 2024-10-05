'use client';

import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    password: string;
}

interface Errors {
    name?: string;
    email?: string;
    password?: string;
}

const RegisterPage = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors: Errors = {}; 

        if (!formData.name) {
            newErrors.name = "Tên không được để trống";
        }
        if (!formData.email) {
            newErrors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }
        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống";
        }

        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Form data submitted:', formData);
            setFormData({
                name: '',
                email: '',
                password: '',
            });
            setErrors({});
        }
    };

    return (
        <div className="flex justify-between p-8 max-w-4xl mx-auto">
            {/* Left Side - Register Form */}
            <div className="flex-1 p-8 flex flex-col items-center border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-[#F2B05E]">Đăng Ký</h2>
                <form className="flex flex-col w-full mb-6" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Tên" 
                        className="p-3 mb-1 border rounded-md border-[#F2B05E]" 
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name}</p>}
                    
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

                    <button className="p-3 bg-[#D98B48] text-white rounded-full hover:bg-opacity-90">
                        Đăng Ký Ngay
                    </button>
                </form>
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
            <div className="flex-1 p-8 flex flex-col items-center justify-center rounded-lg shadow-md text-center" style={{ backgroundColor: '#F2B05E' }}>
                <h2 className="text-2xl font-bold mb-4 text-white">HELLO</h2>
                <p className="mb-6 text-white">Nếu bạn đã có tài khoản, hãy đăng nhập tại đây</p>
                <button className="p-3 bg-[#D98B48] text-white rounded-full hover:bg-opacity-90">
                    Tham Gia Ngay
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;
