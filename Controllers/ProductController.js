const ProductService = require("../Services/ProductService");

class ProductController {
  constructor() {
    // Initialize ProductService
    this.productService = new ProductService();

    // Bind methods to the controller instance
    this.createProduct = this.createProduct.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  // Create a new product
  async createProduct(req, res) {
    try {
      const savedProduct = await this.productService.createProduct(req.body);
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all products
  async getAllProducts(req, res) {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a product
  async updateProduct(req, res) {
    try {
      const updatedProduct = await this.productService.updateProduct(req.params.id, req.body);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a product
  async deleteProduct(req, res) {
    try {
      await this.productService.deleteProduct(req.params.id);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
