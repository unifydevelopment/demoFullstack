const db = require('../config/db');
const authenticateToken = require('../middlewares/authMiddleware'); // Import middleware

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.promise().query('SELECT id, name, email FROM users');
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
