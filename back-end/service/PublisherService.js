const PublisherModel = require('../models/PublisherModel'); // Đảm bảo bạn đã tạo model cho nhà xuất bản

// Hàm thêm nhà xuất bản mới
exports.createPublisher = async (publisherData) => {
    try {
        const newPublisher = new PublisherModel(publisherData);
        const savedPublisher = await newPublisher.save();
        return savedPublisher;
    } catch (error) {
        throw new Error('Error creating publisher: ' + error.message);
    }
};
