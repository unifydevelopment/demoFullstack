require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/**
   * Request Decrypation
   */
app.use(async (req, res, next) => {
  console.log("====================================");
  console.log("REQUEST URL: ", req.originalUrl);
  console.log("METHOD: ", req.method);
  console.log("IP ADDRESS: ", req.ip);
  console.log("HEADERS: ", req.headers);
  console.log("AUTHORIZATION: ", req.headers.authorization || "No Auth Header");
  console.log("QUERY PARAMS: ", req.params);
  console.log("BODY: ", JSON.stringify(req.body, null, 2) || "No Body");
  console.log("USER ID: ", req.user?.user_id || "No User Data");
  console.log("====================================");
  
  next(); // Move to the next middleware
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.BASE_URL}:${PORT}`);
});
