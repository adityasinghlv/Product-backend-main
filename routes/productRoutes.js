const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const ProductController = require('../controllers/ProductController');

const router = express.Router();
const productController = new ProductController();

router.post('/', adminAuth, productController.createProduct); // No need for bind here
router.get('/', productController.getAllProducts);
router.put('/:id', adminAuth, productController.updateProduct);
router.delete('/:id', adminAuth, productController.deleteProduct);

module.exports = router;
