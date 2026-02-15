import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const { city } = req.params;

    console.log("Requested city:", city);
    console.log("API KEY:", process.env.OPENWEATHER_API_KEY);

    if (!process.env.OPENWEATHER_API_KEY) {
      return res.status(500).json({ message: "API key not configured" });
    }

    // 🔹 Step 1: Get Latitude & Longitude
    const geoRes = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    console.log("Geo API response:", geoRes.data);

    if (!geoRes.data || geoRes.data.length === 0) {
      return res.status(404).json({ message: "City not found" });
    }

    const { lat, lon } = geoRes.data[0];

    // 🔹 Step 2: Get AQI Data
    const aqiRes = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    console.log("AQI API response:", aqiRes.data);

    if (!aqiRes.data || !aqiRes.data.list) {
      return res.status(500).json({ message: "AQI data not available" });
    }

    const aqi = aqiRes.data.list[0].main.aqi;

    res.json({
      city,
      aqi
    });

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);
    res.status(500).json({
      message: "Server error",
      error: error.response?.data || error.message
    });
  }
});

export default router;
