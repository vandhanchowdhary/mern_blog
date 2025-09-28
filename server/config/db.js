const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // options if needed
    });
    console.log(`MongoDB database connected: blog\nMongoDB_Host: ${conn.connection.host}`);
  } catch (err) {
    console.error("DB connection error", err);
    process.exit(1);
  }
};

module.exports = connectDB;
