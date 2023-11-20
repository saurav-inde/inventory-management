// // userModel.js

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   isVendor: { type: Boolean, default: false },
// });

// // Add a pre-save hook to hash the password
// userSchema.pre('save', async function (next) {
//   const user = this;
//   if (!user.isModified('password')) return next();

//   // Assuming you have bcrypt installed
//   const bcrypt = require('bcrypt');
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   user.password = hashedPassword;
//   next();
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
