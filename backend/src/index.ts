import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { healthRouter } from "./routes/health";
import { analysisRouter } from "./routes/analysis";

const app = express();

// middleware
app.use(express.json());
app.use(cors()); // Allow all for dev

// routes
app.use("/health", healthRouter);
app.use("/analysis", analysisRouter);

app.listen(env.PORT, () => {
  console.log(`Backend running at http://localhost:${env.PORT}`);
  console.log(`Node env: ${env.NODE_ENV}`);
});
