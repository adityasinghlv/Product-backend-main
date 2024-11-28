const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const CategoryController = require('../Controllers/CategoryController');

const router = express.Router();
const categoryController = new CategoryController();

router.post('/', adminAuth, categoryController.createCategory); // No need for bind here
router.get('/', categoryController.getAllCategories);
router.put('/:id', adminAuth, categoryController.updateCategory);
router.delete('/:id', adminAuth, categoryController.deleteCategory);

module.exports = router;
