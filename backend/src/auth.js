// // authController.js

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// // Signup
// const signup = async (req, res) => {
//   const { email, password, isVendor } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists with this email' });
//     }

//     // Create a new user
//     const newUser = new User({ email, password, isVendor });
//     await newUser.save();

//     res.json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Signin
// const signin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });

//     // If user not found or password doesn't match
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Create and sign a JWT token
//     const token = jwt.sign({ userId: user._id, isVendor: user.isVendor }, 'your-secret-key', { expiresIn: '1h' });

//     // Return the token
//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// module.exports = {
//   signup,
//   signin,
// };
