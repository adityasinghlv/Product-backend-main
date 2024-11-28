const AdminService = require('../Services/AdminService');

class AdminController {
  constructor() {
    this.adminService = new AdminService();
    
    // Bind controller methods
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  // Admin login
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const admin = await this.adminService.login(username, password);
      res.status(200).json({ message: 'Login successful', admin });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  // Admin registration
  async register(req, res) {
    const { username, password } = req.body;

    try {
      const message = await this.adminService.register(username, password);
      res.status(201).json({ message });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = AdminController;
