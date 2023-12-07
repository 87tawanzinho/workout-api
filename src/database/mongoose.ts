const mongoose = require("mongoose");
require("dotenv").config();
export default async function connectDB() {
  await mongoose.connect(process.env.MONGODB_CONNECT);
  console.log("MongoDB Connected 🫡");
}

connectDB().catch((err) => console.log(err));
