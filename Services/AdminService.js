const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

class AdminService {
  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  // Admin login
  async login(username, password) {
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        throw new Error('Invalid username or password');
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        throw new Error('Invalid username or password');
      }

      return { id: admin._id, username: admin.username, role: admin.role };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Admin registration
  async register(username, password) {
    try {
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        throw new Error('Admin already exists');
      }

      const admin = new Admin({ username, password });
      await admin.save();
      return 'Admin registered successfully';
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = AdminService;
