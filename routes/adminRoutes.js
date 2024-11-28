const express = require('express');
const AdminController = require('../Controllers/AdminController');

const router = express.Router();
const adminController = new AdminController();

router.post('/login', adminController.login); // Using bind method to keep 'this' context intact
router.post('/register', adminController.register);

module.exports = router;
