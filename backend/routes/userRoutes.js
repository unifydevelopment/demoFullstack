const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected route to get all users
router.get('/', verifyToken, getAllUsers);

module.exports = router;
