const express = require('express');
const { getAllUsers,createNewUser,editUser,getUserData,deleteUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected route to get all users
router.get('/', verifyToken, getAllUsers);
router.post('/createuser', verifyToken, createNewUser);
router.put('/edit/:id', verifyToken, editUser);
router.get('/edit/:id', verifyToken, getUserData);
router.delete('/delete/:id', verifyToken, deleteUser);


module.exports = router;
