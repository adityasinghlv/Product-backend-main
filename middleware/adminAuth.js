const adminAuth = (req, res, next) => {
    // In real applications, implement proper session or token-based authentication
    const { role } = req.headers;
    if (role !== 'Admin') {
      return res.status(401).json({ message: 'Unauthorized access' });
    }
    next();
  };
  
  module.exports = adminAuth;
  