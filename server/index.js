import dns from "node:dns";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import contactRoutes from "./routes/contact.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

// Use public DNS servers for MongoDB SRV lookup
dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);

// Get current server directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

// Load .env from project root
dotenv.config({
  path: resolve(__dirname, "..", ".env"),
});

const app = express();
const PORT = process.env.PORT || 5000;

console.log(
  "MONGODB_URI loaded:",
  Boolean(process.env.MONGODB_URI)
);

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN
      ? process.env.CLIENT_ORIGIN.split(",")
      : "*",
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "abhishek-portfolio-api",
  });
});

// Contact routes
app.use("/api/contact", contactRoutes);

// Serve React production build
const clientDist = resolve(process.cwd(), "client", "dist");

app.use(express.static(clientDist));

app.get("/", (_req, res) => {
  res.sendFile(resolve(clientDist, "index.html"));
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
async function start() {
  if (!process.env.MONGODB_URI) {
    console.warn(
      "MONGODB_URI not set — contact submissions will not persist."
    );
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected");
    } catch (error) {
      console.warn(
        `MongoDB unavailable — contact submissions will be disabled. ${error.message}`
      );
    }
  }

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

start();