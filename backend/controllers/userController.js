const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const authenticateToken = require('../middlewares/authMiddleware'); // Import middleware

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Initialize upload middleware
const upload = multer({ storage, fileFilter }).single("profile_image");

// Function to create a new user
exports.createNewUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { name, email, password, role } = req.body;
    const profileImage = req.file ? req.file.filename : null; // Get uploaded image filename

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const [existingUser] = await db.promise().query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (existingUser.length > 0) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.promise().query(
        "INSERT INTO users (name, email, password, role, profile_image) VALUES (?, ?, ?, ?, ?)",
        [name, email, hashedPassword, role, profileImage]
      );

      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.error("Error during registration:", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.promise().query('SELECT id, name, email, role FROM users ORDER BY id DESC');
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Edit user
exports.getUserData = async (req, res) => {
  try {
    const { id } = req.params;  // Get user ID from request parameters
    const query = 'SELECT id, name, email, role FROM users WHERE id = ?';

    // Execute the query to get user data
    const [user] = await db.promise().query(query, [id]);

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user data
    res.status(200).json(user[0]); // Send back the first user in the result
  } catch (err) {
    console.error('Error fetching user data:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user

exports.editUser = async (req, res) => {
  try {

    const { id } = req.params;
    const { name, email, password } = req.body;
    // console.log(req.params)
    // console.log(req.body)
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    const [results] = await db.promise().query(query, [name, email, hashedPassword, id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated' });
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).json({ message: 'Failed to update user' });
  }
};



// Delete user
exports.deleteUser = async (req, res) => {
  try {
        const { id } = req.params;
        const query = 'DELETE FROM users WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error('Error deleting user:', err);
          res.status(500).json({ message: 'Failed to delete user' });
          return;
        }
        if (results.affectedRows === 0) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.status(200).json({ message: 'User deleted' });
      });
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

