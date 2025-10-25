import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function PortfolioChart({ analysis }) {
  const data = Object.entries(analysis.latest_prices).map(([ticker, price]) => ({
    ticker,
    price,
  }));

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Latest Stock Prices</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ticker" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="price" fill="#2563EB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
