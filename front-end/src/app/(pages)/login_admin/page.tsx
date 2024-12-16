
"use client"

import React, { useState } from 'react';
import useFetchAdmin from '@/app/hook/useFetchAdmin';
import Link from "next/link";

export default function Login() {
  const { login } = useFetchAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // State for error message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);

    if (result.error) {
      setError(result.error); // Display error message if login fails
    } else {
      setError(null); // Clear error if login succeeds
    }
  };

  return (
    <div 
      className="flex items-center justify-center h-screen bg-cover bg-center bg-light-100" 
      style={{ backgroundImage: "url('/banner/login.png')" }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg p-10 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold font-itim text-center mb-2">Login to Account</h2>
        <p className="text-center text-gray-600 mb-6">Vui lòng nhập email và mật khẩu của bạn để tiếp tục</p>

        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Bind email state
              placeholder="esteban_schiller@gmail.com"
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật Khẩu</label>
            <div className="flex items-center justify-between">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Bind password state
                placeholder="********"
                className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>
          <Link
          href="/ForgotPassword">
          <div className="flex items-center">
            <label htmlFor="remember" className="ml-2 text-gray-700 text-sm">Quên Mật Khẩu</label>
          </div>
          </Link>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-primary-400 text-white font-semibold rounded-md hover:bg-primary-400 transition-colors"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
}
