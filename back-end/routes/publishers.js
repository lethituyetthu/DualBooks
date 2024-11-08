var express = require('express');
var router = express.Router();
const publisherController = require('../controller/PublisherController');
const uploadPublishers = require('../middlewares/uploadPublishers'); // Middleware để upload hình ảnh
const authenticateAdmin = require('../middlewares/auth'); // Middleware để xác thực admin

// Endpoint thêm nhà xuất bản mới với hình ảnh
// POST /api/publishers
router.post('/',  uploadPublishers.single('img'), async (req, res, next) => {
    console.log('POST /publishers endpoint hit');
    try {
        // Lấy dữ liệu nhà xuất bản từ body của request
        const publisherData = req.body;

        // Kiểm tra xem có tệp tin hình ảnh được tải lên không
        if (req.file) {
            // Lưu tên file hình ảnh vào trường img
            publisherData.img = req.file.filename;
        } else {
            // Nếu không có hình ảnh, có thể thiết lập một giá trị mặc định hoặc bỏ qua
            publisherData.img = 'default.jpg'; // Ví dụ: sử dụng hình ảnh mặc định
        }

        const newPublisher = await publisherController.createPublisher(publisherData);

        console.log('Publisher created successfully:', newPublisher);
        res.status(201).json(newPublisher);
    } catch (error) {
        console.error('Error creating publisher:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
