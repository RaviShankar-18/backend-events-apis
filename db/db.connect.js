const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
  try {
    await mongoose
      .connect(mongoUri)
      .then(() => console.log(`Database connected`));
  } catch (error) {
    console.error(`An error occurred in connectin DB ${error.message}`);
  }
};

module.exports = { initializeDatabase };
