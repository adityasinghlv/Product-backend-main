const Category = require('../models/Category');

class CategoryService {
  constructor() {
    this.createCategory = this.createCategory.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  // Create a new category
  async createCategory(categoryData) {
    try {
      const category = new Category(categoryData);
      return await category.save();
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  // Get all categories
  async getAllCategories() {
    try {
      return await Category.find();
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

  // Update a category
  async updateCategory(id, categoryData) {
    try {
      return await Category.findByIdAndUpdate(id, categoryData, { new: true });
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  }

  // Delete a category
  async deleteCategory(id) {
    try {
      await Category.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
  }
}

module.exports = CategoryService;
