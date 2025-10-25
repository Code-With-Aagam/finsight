import React, { useState } from "react";

export default function PortfolioForm({ onAnalyze, onPredict }) {
  const [portfolio, setPortfolio] = useState([
    { ticker: "AAPL", weight: 0.6 },
    { ticker: "MSFT", weight: 0.4 },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(portfolio);
    onPredict(0.005, 0.02); // example inputs
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>Enter Portfolio</h2>
      {portfolio.map((item, i) => (
        <div key={i} style={{ marginBottom: "0.5rem" }}>
          <input
            type="text"
            value={item.ticker}
            onChange={(e) => {
              const updated = [...portfolio];
              updated[i].ticker = e.target.value.toUpperCase();
              setPortfolio(updated);
            }}
            placeholder="Ticker"
            style={{ width: "80px", marginRight: "8px" }}
          />
          <input
            type="number"
            value={item.weight}
            step="0.1"
            onChange={(e) => {
              const updated = [...portfolio];
              updated[i].weight = parseFloat(e.target.value);
              setPortfolio(updated);
            }}
            placeholder="Weight"
            style={{ width: "80px" }}
          />
        </div>
      ))}
      <button type="submit" style={{ background: "#2563EB", color: "white", border: "none", padding: "8px 16px" }}>
        Analyze Portfolio
      </button>
    </form>
  );
}
