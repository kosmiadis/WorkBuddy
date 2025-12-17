import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { config } from "../config/config";
configDotenv();

export async function connectToDb () {
    await mongoose.connect(config.MONGODB_URI);
}


