import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
dotenv.config();
const PORT = process.env.PORT || 3000;
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB using mongoose");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
main();
