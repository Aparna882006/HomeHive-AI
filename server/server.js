import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import compatibilityRoutes from "./routes/compatibilityRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HomeHive AI Backend Running 🚀",
  });
});

// Debug Middleware (VERY IMPORTANT)
app.use((req, res, next) => {
  console.log("=================================");
  console.log("REQUEST:", req.method, req.url);
  console.log("BODY:", req.body);
  console.log("=================================");
  next();
});

// Routes
app.use("/api/compatibility", compatibilityRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.log("❌ GLOBAL ERROR:");
  console.log(err);

  res.status(500).json({
    success: false,
    error: err.message || "Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});