const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  try {

    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    });

    console.log("Connected to MongoDB database");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); 
  }
};

module.exports = { connectToDatabase };
