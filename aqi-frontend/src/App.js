import { useEffect, useCallback, useState } from "react";
import API from "./services/api";

function App() {
  const [city, setCity] = useState("delhi");
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAQI = useCallback(async (selectedCity) => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get(`/aqi/${selectedCity}`);
      setAqi(res.data);

    } catch (err) {
      setError("City not found or server error.");
      setAqi(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAQI("delhi");
  }, [fetchAQI]);

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchAQI(city.toLowerCase());
    }
  };

  // 🌈 Professional AQI Color Scale
  const getAqiStyles = (value) => {
    if (value <= 50) return { color: "text-green-400", bg: "bg-green-900/30" };
    if (value <= 100) return { color: "text-yellow-400", bg: "bg-yellow-900/30" };
    if (value <= 150) return { color: "text-orange-400", bg: "bg-orange-900/30" };
    if (value <= 200) return { color: "text-red-400", bg: "bg-red-900/30" };
    if (value <= 300) return { color: "text-purple-400", bg: "bg-purple-900/30" };
    return { color: "text-pink-500", bg: "bg-pink-900/30" };
  };

  const styles = aqi ? getAqiStyles(aqi.aqi) : {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center px-4">

      <h1 className="text-5xl font-bold text-green-400 mb-10 tracking-wide">
        AQI Monitor 🌍
      </h1>

      {/* 🔍 Search */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          className="px-5 py-3 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition duration-300"
        >
          Search
        </button>
      </div>

      {/* 🔄 Loading */}
      {loading && (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-400"></div>
      )}

      {/* ❌ Error */}
      {error && (
        <p className="text-red-400 mt-4 text-lg">{error}</p>
      )}

      {/* 📊 AQI Card */}
      {aqi && !loading && (
        <div className={`p-10 rounded-3xl shadow-2xl text-center w-96 transition-all duration-500 transform hover:scale-105 ${styles.bg} animate-fadeIn`}>

          <p className="text-xl mb-3 opacity-80">
            City: <span className="capitalize font-semibold">{aqi.city}</span>
          </p>

          <p className={`text-5xl font-extrabold mb-3 ${styles.color}`}>
            {aqi.aqi}
          </p>

          <p className="text-lg opacity-90">
            {aqi.category}
          </p>
        </div>
      )}

    </div>
  );
}

export default App;
