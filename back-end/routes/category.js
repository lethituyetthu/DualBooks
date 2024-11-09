const express = require('express');
const router = express.Router();
const categoryController = require('../controller/CategoryController');
const uploadCategory = require('../middlewares/uploadCategory');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const authenticateAdmin = require('../middlewares/auth');

// GET all categories
router.get('/', async (req, res) => {
    try {
        const result = await categoryController.getAll(req, res);
        if (result && result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'No categories found' });
        }
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET category by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryController.findById(id);
        if (category) {
            res.status(200).json({ data: category });
        } else {
            res.status(404).json({ error: `No category found with id: ${id}` });
        }
    } catch (error) {
        console.error('Error fetching category:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST create a new category
router.post('/', uploadCategory.single('cate_image'), async (req, res) => {
    try {
        const categoryData = req.body;
        categoryData.cate_image = req.file ? req.file.filename : null; // Allow cate_image to be null

        const newCategory = await categoryController.createCategory(categoryData);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', uploadCategory.single('cate_image'), [
    body('name').notEmpty().withMessage('Category name is required'),
    body('description').notEmpty().withMessage('Category description is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file) fs.unlinkSync(req.file.path); // Remove file if there are validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const categoryId = req.params.id;
        const categoryData = req.body;

        // Fetch the current category from the database
        const currentCategory = await categoryController.findById(categoryId);
        if (!currentCategory) {
            if (req.file) fs.unlinkSync(req.file.path); // Remove uploaded file if category not found
            return res.status(404).json({ error: 'Category not found' });
        }

        // If there's a new file, update the image; otherwise, keep the existing one
        if (req.file) {
            categoryData.cate_image = req.file.filename;

            // Optionally delete the old image
            if (currentCategory.cate_image) {
                const oldImagePath = path.join(__dirname, '..', 'uploads', 'categories', currentCategory.cate_image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); // Delete old image
                }
            }
        } else {
            // Keep the existing image if no new image is uploaded
            categoryData.cate_image = currentCategory.cate_image;
        }

        const updatedCategory = await categoryController.updateCategory(categoryId, categoryData);
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error.message);
        if (req.file) fs.unlinkSync(req.file.path); // Remove file if there are errors
        res.status(500).json({ error: 'Internal server error' });
    }
});


// DELETE delete a category
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Tìm danh mục theo ID
        const category = await categoryController.findById(id);
        if (!category) {
            return res.status(404).json({ error: `Category with id ${id} not found` });
        }

        // Xóa hình ảnh cũ của danh mục (nếu có)
        if (category.cate_image) {
            const imagePath = path.join(__dirname, '..', 'uploads', 'categories', category.cate_image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Xóa hình ảnh
            }
        }

        // Xóa danh mục khỏi database
        await categoryController.deleteCategory(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
