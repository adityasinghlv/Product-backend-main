const Product = require('../models/Product');
const { fetchAndProcessProducts } = require('../utils/productUtils');

class ProductService {
  constructor() {
    // Bind methods to the service instance
    this.createProduct = this.createProduct.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  // Create a new product
  async createProduct(productData) {
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  // Get all products and process them
  async getAllProducts() {
    try {
      return await fetchAndProcessProducts();
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  // Update a product
  async updateProduct(id, productData) {
    try {
      return await Product.findByIdAndUpdate(id, productData, { new: true });
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  // Delete a product
  async deleteProduct(id) {
    try {
      await Product.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
}

module.exports = ProductService;
