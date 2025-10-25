import React from "react";

export default function VolatilityCard({ prediction }) {
  if (!prediction) return null;
  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#F9FAFB",
      }}
    >
      <h3>📉 Predicted Next-Day Volatility</h3>
      <p style={{ fontSize: "1.5rem", color: "#16A34A" }}>{prediction.toFixed(6)}</p>
    </div>
  );
}
