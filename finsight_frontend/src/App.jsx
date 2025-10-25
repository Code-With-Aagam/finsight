import React, { useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const API_BASE = "http://127.0.0.1:8000/api/v1";
const COLORS = ["#2563EB", "#16A34A", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function App() {
  const [portfolio, setPortfolio] = useState([{ ticker: "AAPL", weight: 0.6 }, { ticker: "MSFT", weight: 0.4 }]);
  const [result, setResult] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (i, field, v) => {
    const cp = [...portfolio]; cp[i][field] = field === "weight" ? parseFloat(v) : v.toUpperCase(); setPortfolio(cp);
  };

  const analyze = async () => {
    setLoading(true);
    try {
      const r = await axios.post(`${API_BASE}/analyze`, { portfolio });
      setResult(r.data);
      // call predict using latest return estimate and volatility (example)
      const predicted = await axios.post(`${API_BASE}/predict-volatility`, {
        return_value: 0.001, current_volatility: r.data.volatility
      });
      setPrediction(predicted.data.predicted_next_volatility);
    } catch (e) {
      alert("Error: " + (e.response?.data?.detail || e.message));
    } finally { setLoading(false); }
  };

  const pieData = result ? portfolio.map((p, i) => ({ name: p.ticker, value: p.weight })) : [];
  const barData = result ? Object.entries(result.latest_prices).map(([k,v]) => ({ ticker: k, price: v })) : [];

  return (
    <div style={{ padding: 24 }}>
      <h1>FinSight Dashboard</h1>
      {portfolio.map((p, i) => (
        <div key={i}>
          <input value={p.ticker} onChange={e => handleChange(i, "ticker", e.target.value)} />
          <input type="number" step="0.1" value={p.weight} onChange={e => handleChange(i, "weight", e.target.value)} />
        </div>
      ))}
      <button onClick={analyze} disabled={loading}>Analyze Portfolio</button>
      {loading && <div>Loading...</div>}

      {result && (
        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
          <div style={{ width: 300, height: 300 }}>
            <h3>Weights</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
                  {pieData.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ width: 400, height: 300 }}>
            <h3>Latest Prices</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ticker" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ minWidth: 240 }}>
            <h3>Metrics</h3>
            <div>Expected Return: {result.expected_return}</div>
            <div>Volatility: {result.volatility}</div>
            <div>Sharpe: {result.sharpe_ratio}</div>
            <div style={{ marginTop: 12 }}>Predicted next volatility: {prediction}</div>
          </div>
        </div>
      )}
    </div>
  );
}
