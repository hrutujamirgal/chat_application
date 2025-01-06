const mongoose = require("mongoose");
require('dotenv').config();



const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URL; 
    if (!uri) {
      throw new Error("MongoDB URI is not defined.");
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectDB;
