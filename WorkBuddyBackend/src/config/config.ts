import { configDotenv } from "dotenv";
configDotenv();

interface Config {
    ORIGIN: string;
    PORT: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
}

export const config: Config = {
    ORIGIN: 'http://localhost:5173',
    MONGODB_URI: process.env!.MONGODB_URI!,
    PORT: process.env.PORT!,
    JWT_SECRET: process.env.JWT_SECRET!
}