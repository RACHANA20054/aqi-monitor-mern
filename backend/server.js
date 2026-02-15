import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import aqiRoutes from "./routes/aqiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ IMPORTANT: This connects your route file
app.use("/api/aqi", aqiRoutes);

// Test route (to confirm server works)
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
