const express = require('express');
    const router = express.Router();
    const { createCategory, getCategories, updateCategory, deleteCategory,getCategoryById } = require('../controllers/categoryController');
    const auth = require('../middleware/authMiddleware');

    router.post('/', auth, createCategory);
    router.get('/', auth, getCategories);
    router.put('/:id', auth, updateCategory);
    router.delete('/:id', auth, deleteCategory);
    router.get('/:id', auth, getCategoryById);
    module.exports = router;