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

// Hàm gửi OTP
const sendOtpEmail = async (toEmail, otp) => {
    const mailOptions = {
        from: 'hieunnps30444@fpt.edu.vn',
        to: toEmail,
        subject: 'Mã OTP của bạn',
        text: `Mã OTP của bạn là: ${otp}. Mã có hiệu lực trong 5 phút.`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Gửi OTP thất bại: ' + error.message);
    }
};
const sendTokenEmail = async (toEmail, token) => {
    const resetLink = `http://localhost:3000/customer/ResetPassword?token=${token}`; // Xây dựng đường link đặt lại mật khẩu

    const mailOptions = {
        from: 'hieunnps30444@fpt.edu.vn',
        to: toEmail,
        subject: 'Đặt lại mật khẩu', // Tiêu đề của email
        text: `Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấp vào liên kết sau để đặt lại mật khẩu: ${resetLink}` // Nội dung email chứa đường link reset
    };

    try {
        await transporter.sendMail(mailOptions); // Gửi email với các thông tin trên
    } catch (error) {
        throw new Error('Gửi email thất bại: ' + error.message); // Xử lý lỗi nếu gửi email thất bại
    }
};
const sendTokenEmails = async (toEmail, token) => {
    const resetLink = `http://localhost:3000/ResetPassword?token=${token}`; // Xây dựng đường link đặt lại mật khẩu

    const mailOptions = {
        from: 'hieunnps30444@fpt.edu.vn',
        to: toEmail,
        subject: 'Đặt lại mật khẩu', // Tiêu đề của email
        text: `Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấp vào liên kết sau để đặt lại mật khẩu: ${resetLink}` // Nội dung email chứa đường link reset
    };

    try {
        await transporter.sendMail(mailOptions); // Gửi email với các thông tin trên
    } catch (error) {
        throw new Error('Gửi email thất bại: ' + error.message); // Xử lý lỗi nếu gửi email thất bại
    }
};

// Hàm gửi email đặt lại mật khẩu
const sendResetPasswordEmail = async (toEmail, resetLink) => {
    const mailOptions = {
        from: 'hieunnps30444@fpt.edu.vn',
        to: toEmail,
        subject: 'Đặt lại mật khẩu',
        text: `Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấp vào liên kết sau để đặt lại mật khẩu: ${resetLink}`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Gửi email đặt lại mật khẩu thất bại: ' + error.message);
    }
};

module.exports = { 
    sendVerificationEmail, 
    sendOtpEmail, 
    sendTokenEmail,
    sendTokenEmails,
    sendResetPasswordEmail 
};
