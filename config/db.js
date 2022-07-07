const mongoose = require("mongoose");
const config = require("config");

const dbHandle = async () => {
  try {
    await mongoose.connect(config.get("dbURL"));
    ("Database Successuflly connected...");
  } catch (error) {
    "server Error..." + error.message;
    process.exit(1);
  }
};
module.exports = dbHandle;
