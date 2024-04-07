import mongoose from "mongoose";
import config from "../config/config.js";

export const URI = config.mongodbUri;

export const initMongo = async () => {
  try {
    mongoose.connect(URI);
    console.log("DB initialized correctly");
  } catch (error) {
    console.error(error, "Error while connecting to DB");
  }
};
