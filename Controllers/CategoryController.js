const CategoryService = require("../Services/CategoryService");

class CategoryController {
  constructor() {
    // Initialize CategoryService
    this.categoryService = new CategoryService();

    // Bind controller methods
    this.createCategory = this.createCategory.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  // Create a new category
  async createCategory(req, res) {
    try {
      const savedCategory = await this.categoryService.createCategory(req.body);
      res.status(201).json(savedCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all categories
  async getAllCategories(req, res) {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a category
  async updateCategory(req, res) {
    try {
      const updatedCategory = await this.categoryService.updateCategory(req.params.id, req.body);
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a category
  async deleteCategory(req, res) {
    try {
      await this.categoryService.deleteCategory(req.params.id);
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CategoryController;
