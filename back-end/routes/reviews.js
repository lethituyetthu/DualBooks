const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');

// Tạo một đánh giá mới
router.post('/', async (req, res) => {
    console.log('POST /reviews endpoint hit');
    try {
        const reviewData = req.body;
        const newReview = await reviewController.createReview(reviewData);
        console.log('Review created successfully:', newReview);
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error creating review:', error.message);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
