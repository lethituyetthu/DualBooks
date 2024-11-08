const multer = require('multer'); 
const path = require('path');

// Cấu hình Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Lưu hình ảnh vào thư mục 'uploads/publishers' trong thư mục gốc
        cb(null, path.join(__dirname, '../uploads/publishers'));
    },
    filename: (req, file, cb) => {
        // Đặt tên file duy nhất bằng cách thêm timestamp vào tên gốc
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Bộ lọc để chỉ cho phép các loại tệp tin hình ảnh
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed (jpeg, jpg, png, gif, webp)'));
    }
};

// Khởi tạo Multer với cấu hình đã định nghĩa
const uploadPublishers = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Giới hạn kích thước file là 5MB
});

module.exports = uploadPublishers;
