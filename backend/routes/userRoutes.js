const express = require('express');
const { getAllUsers,createNewUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected route to get all users
router.post('/createuser', verifyToken, createNewUser);
router.get('/', verifyToken, getAllUsers);


module.exports = router;
