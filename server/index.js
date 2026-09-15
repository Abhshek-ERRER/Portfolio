import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import contactRoutes from "./routes/contact.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN?.split(",") || "*",
  credentials: true
}));
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "abhishek-portfolio-api" });
});

app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected");
    } else {
      console.warn("MONGODB_URI not set — contact submissions will not persist.");
    }
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

start();
