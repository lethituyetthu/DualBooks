const nodemailer = require('nodemailer');

// Cấu hình thông tin SMTP để gửi email
const transporter = nodemailer.createTransport({
    service: 'gmail', // Bạn có thể thay thế bằng dịch vụ email khác nếu cần
    auth: {
        user: 'hieunnps30444@fpt.edu.vn', // Email của bạn
        pass: 'jtwl rkvn rrxu cztc'         // Mật khẩu email của bạn
    }
});

// Hàm gửi email xác nhận
const sendVerificationEmail = async (toEmail, verificationCode) => {
    const mailOptions = {
        from: 'hieunnps30444@fpt.edu.vn',  // Email gửi đi
        to: toEmail,                   // Email người nhận
        subject: 'Xác nhận email đăng ký', // Tiêu đề email
        text: `Mã xác nhận của bạn là: ${verificationCode}` // Nội dung email chứa mã xác nhận
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Gửi email thất bại: ' + error.message);
    }
};

module.exports = { sendVerificationEmail };
