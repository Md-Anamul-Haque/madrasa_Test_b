const mongoose = require("mongoose");
const config = require("./config");
const dbURL = 'mongodb://localhost:27017/madrasaumarDB' || config.db.url;

const connectDatabase = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("mongodb atlas is connected");
    // addcard();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDatabase();
