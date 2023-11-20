// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0:27017/auth-example", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isVendor: { type: Boolean, default: false },
});

// Add a pre-save hook to hash the password
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

// Define a product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  availableQuantity: Number,
});

const Product = mongoose.model("Product", productSchema);

// saved products
const initialProducts = [
  { name: "Product 1", price: 20.99, availableQuantity: 520 },
  { name: "Product 2", price: 15.49, availableQuantity: 130 },
  { name: "Product 3", price: 18.49, availableQuantity: 302 },
  { name: "Product 4", price: 10.55, availableQuantity: 430 },
  { name: "Product 5", price: 55.39, availableQuantity: 300 },
  { name: "Product 6", price: 25.99, availableQuantity: 120 },
  { name: "Product 7", price: 12.49, availableQuantity: 250 },
  { name: "Product 8", price: 22.99, availableQuantity: 180 },
  { name: "Product 9", price: 30.99, availableQuantity: 420 },
  { name: "Product 10", price: 8.99, availableQuantity: 150 },
  { name: "Product 11", price: 14.99, availableQuantity: 200 },
  { name: "Product 12", price: 32.49, availableQuantity: 320 },
  { name: "Product 13", price: 19.99, availableQuantity: 270 },
  { name: "Product 14", price: 7.99, availableQuantity: 180 },
  { name: "Product 15", price: 41.99, availableQuantity: 360 },
  { name: "Product 16", price: 13.49, availableQuantity: 290 },
  { name: "Product 17", price: 27.99, availableQuantity: 240 },
  { name: "Product 18", price: 9.99, availableQuantity: 210 },
  { name: "Product 19", price: 35.49, availableQuantity: 430 },
  { name: "Product 20", price: 16.99, availableQuantity: 180 },
  // Add more products as needed
];


//  Product.insertMany(initialProducts);
// API endpoint to get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Authentication Endpoints

// Signup
app.post("/api/signup", async (req, res) => {
  const { email, password, isVendor } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Create a new user
    const newUser = new User({ email, password, isVendor });
    await newUser.save();

    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Signin
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Findinrg user by email
    const user = await User.findOne({ email });

    // If user not found or password doesn't match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and sign a JWT token
    const token = jwt.sign(
      { userId: user._id, isVendor: user.isVendor },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    // Return the token
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
