import mongoose from "mongoose";
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is Connected succefull");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "artshop",
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
