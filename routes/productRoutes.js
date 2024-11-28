const express = require('express');
const Product = require('../models/Product');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Create a new product
router.post('/', adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products with category name populated
router.get('/', async (req, res) => {
  try {
      // Populate category field with category name
      const products = await Product.find().sort({ position: 1 })  // Sort by position
          .populate({
              path: 'category',
              select: 'name -_id'
          });

      res.status(200).json(products);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Update a product
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

// Delete a product
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
