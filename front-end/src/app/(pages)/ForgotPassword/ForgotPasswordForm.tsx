'use client'; // Đánh dấu thành phần là Client Component
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ForgotPasswordForm: React.FC = () => {
  const router = useRouter(); // Khởi tạo router
  const [email, setEmail] = useState<string>(''); // Trạng thái cho email
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill('')); // Mảng cho các chữ số OTP
  const [otpSent, setOtpSent] = useState<boolean>(false); // Trạng thái gửi mã OTP
  const [countdown, setCountdown] = useState<number>(0); // Trạng thái đồng hồ đếm ngược

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer); // Dọn dẹp bộ đếm khi component unmount
  }, [countdown]);

  // Gửi email đến API và lưu vào localStorage
  const handleSendOtp = async () => {
    try {
      const response = await fetch('http://localhost:3200/admins/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        setCountdown(300); // Ví dụ: 30 giây
        // Lưu email vào localStorage
        localStorage.setItem('email', email);
        console.log(`Mã OTP đã được gửi đến: ${email}`);
      } else {
        alert(data.message); // Thông báo nếu email không hợp lệ
      }
    } catch (error) {
      console.error('Lỗi khi gửi OTP:', error);
    }
  };

  const handleChangeOtp = (value: string, index: number) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value.slice(-1); // Lấy chữ số cuối cùng được nhập vào
    setOtpDigits(newOtpDigits);

    // Tự động chuyển sang ô tiếp theo khi nhập đủ 1 chữ số
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleResendOtp = () => {
    setOtpDigits(Array(6).fill(''));
    setOtpSent(false);
    setCountdown(30); // Reset countdown về 30 giây
    handleSendOtp(); // Gửi lại mã OTP
  };

  const handleVerifyOtp = async () => {
    const otpString = otpDigits.join('');
    const storedEmail = localStorage.getItem('email'); // Lấy lại email từ localStorage

    if (!storedEmail) {
      alert('Email không tồn tại trong bộ nhớ!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3200/admins/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: storedEmail, otp: otpString }),
      });

      const data = await response.json();

      if (data.success) {
        // // Mở tab mới và điều hướng đến trang Reset Password
        // const newTab = window.open('/admin/ResetPassword', '_blank');
        // if (newTab) newTab.focus();
        alert(data.message); // Thông báo nếu OTP không đúng
      } else {
        alert(data.message); // Thông báo nếu OTP không đúng
      }
    } catch (error) {
      console.error('Lỗi khi xác thực OTP:', error);
    }
  };

  const handleBack = () => {
    router.push('/login_admin'); // Quay lại trang đăng nhập
  };

  return (
    <div 
    className="flex items-center justify-center h-screen bg-cover bg-center bg-light-100" 
    style={{ backgroundImage: "url('/banner/login.png')" }}
  >
    <div className="bg-white bg-opacity-90 rounded-lg p-10 shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold font-itim text-center mb-2">Quên mật khẩu</h2>
      <p className="mb-4 text-center">Vui lòng nhập thông tin bên dưới!</p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={(e) => {
          // Gửi email khi nhấn Enter
          if (e.key === 'Enter') {
            handleSendOtp();
          }
        }}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <p className="text-center">
        Nhập mã xác thực OTP gửi đến <strong>{email}</strong>
      </p>

      <div className="flex justify-center mt-5">
        {otpDigits.map((digit, index) => (
          <input
            key={index}
            type="text"
            id={`otp-input-${index}`}
            value={digit}
            onChange={(e) => handleChangeOtp(e.target.value, index)}
            className="w-10 h-10 mx-1 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={1}
            style={{ backgroundColor: '#F4F4F4', fontWeight: 'bold' }}
          />
        ))}
      </div>

      {countdown > 0 && otpSent && (
        <p className="text-red-600 text-center mt-3">
          {Math.floor(countdown / 60).toString().padStart(2, '0')}:
          {(countdown % 60).toString().padStart(2, '0')}
        </p>
      )}

      {countdown === 0 && otpSent && (
        <p className="text-red-600 text-center mt-3">Thời gian đã hết! Hãy yêu cầu gửi lại mã OTP.</p>
      )}

      <p className="text-center mt-5">
        Nếu không nhận được mã?{' '}
        <span
          onClick={handleResendOtp}
          className="text-[#ffc535] cursor-pointer hover:underline"
        >
          Gửi lại
        </span>
      </p>
      <button
        onClick={handleVerifyOtp}
        className= "bg-primary-400 text-white rounded-md p-2 w-full"
        disabled={otpDigits.includes('')} // Disable nút nếu có ô trống
      >
        Xác thực
      </button>
      <button
        onClick={handleBack}
        className="text-black font-bold mt-4 w-full text-center"
        style={{ textDecoration: 'none' }}
      >
        Trở về
      </button>
    </div>
    </div>
  );
};

export default ForgotPasswordForm;
