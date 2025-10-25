// src/api.js
import axios from "axios";

const BASE = "http://127.0.0.1:8000/api/v1";

export async function analyzePortfolioAPI(portfolio, period = "6mo") {
  // portfolio: [{ ticker: "AAPL", weight: 0.6 }, ...]
  const payload = { portfolio, period };
  const res = await axios.post(`${BASE}/analyze`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

export async function predictVolatilityAPI(return_value, current_volatility) {
  const payload = { return_value, current_volatility };
  const res = await axios.post(`${BASE}/predict-volatility`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}
