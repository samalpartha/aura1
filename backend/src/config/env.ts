import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "4000",
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  NODE_ENV: process.env.NODE_ENV || "development"
};
