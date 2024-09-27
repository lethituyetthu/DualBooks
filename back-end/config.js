require('dotenv').config();

module.exports = {
    SECRET_KEY: process.env.JWT_SECRET_KEY || 'default_secret_key', // Sử dụng secret key từ biến môi trường hoặc một giá trị mặc định
};
