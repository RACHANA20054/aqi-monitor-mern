const mongoose = require("mongoose");

const aqiSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  aqi: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("AQI", aqiSchema);
