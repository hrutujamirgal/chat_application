const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
require('dotenv').config();

const User = require("../schema/Users")

// Secret Key for JWT
const JWT_SECRET = process.env.JWT_TOKEN;


router.post("/",(req,res)=>{
  console.log("working properly")
})


// Login Route
router.post("/login", async (req, res) => {
  const { name, password } = req.body;


  // Validate Input
  if (!name || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Find User
  const user = await User.findOne({name});
  
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password." });
  }


  // Check Password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  // Generate JWT
  const token = jwt.sign({ id: user.id, username: user.name }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({ message: "Login successful", token:token, data:{id:user.id, username:user.name}});
});


// Signup Route
router.post("/signup", async (req, res) => {
  const { name, password, email, github } = req.body;

  // Validate Input
  if (!name || !password || !email || !github) {
    return res.status(400).json({ message: "Essential fields are required." });
  }

  try {
    // Check if user already exists (database query)
    const userExists = await User.findOne({ name });
    if (userExists) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create New User and save to DB
    const newUser = new User({
      name: name,
      email: email,
      github: github,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name }, // Use _id from MongoDB
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({ message: "User created successfully", token:token, data:{id:user.id, username:user.name}});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});


// Example Protected Route
router.get("/protected", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or invalid." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({ message: "Access granted to protected route.", user: decoded });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
});

module.exports = router;
