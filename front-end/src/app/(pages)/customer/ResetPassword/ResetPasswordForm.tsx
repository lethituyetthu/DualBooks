'use client'; // Đánh dấu thành phần là Client Component
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ResetPasswordForm: React.FC = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState<string>(''); // Trạng thái cho mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // Trạng thái cho xác nhận mật khẩu

  const handleResetPassword = async () => {
    if (newPassword === confirmPassword) {
      const storedEmail = localStorage.getItem('email'); // Lấy email từ localStorage

      if (!storedEmail) {
        alert('Không tìm thấy email trong localStorage. Vui lòng thử lại!');
        return;
      }

      try {
        // Gửi yêu cầu API đặt lại mật khẩu
        const response = await fetch('http://localhost:3200/customers/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: storedEmail,
            newPassword,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Mật khẩu đã được đặt lại thành công!');
          router.push('/customer/login'); // Chuyển về trang đăng nhập
        } else {
          alert(data.message || 'Đã xảy ra lỗi trong quá trình đặt lại mật khẩu.');
        }
      } catch (error) {
        console.error('Lỗi khi gửi yêu cầu đặt lại mật khẩu:', error);
        alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      }
    } else {
      alert('Mật khẩu và xác nhận mật khẩu không khớp!');
    }
  };

  const handleBack = () => {
    router.push('/customer/login'); // Quay lại trang đăng nhập
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Quên mật khẩu</h2>
      <p className="mb-4 text-center">Vui lòng nhập thông tin bên dưới!</p>

      <input
        type="password"
        placeholder="Mật khẩu mới"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <input
        type="password"
        placeholder="Xác nhận lại mật khẩu"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />

      <button
        onClick={handleResetPassword}
        className="bg-[#fec435] text-white rounded-md p-2 w-full mt-4"
      >
        Xác nhận
      </button>
      <button
        onClick={handleBack}
        className="text-black font-bold mt-4 w-full text-center"
        style={{ textDecoration: 'none' }} // Không gạch chân
      >
        Trở về
      </button>
    </div>
  );
};

export default ResetPasswordForm;
