import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

export default function PortfolioCharts({ portfolioData, analysis }) {
  if (!portfolioData || !analysis) return null;

  const pieData = portfolioData.map((p) => ({
    name: p.ticker,
    value: parseFloat(p.weight),
  }));

  const scatterData = [
    {
      name: "Portfolio",
      return: (analysis.expected_return * 100).toFixed(2),
      volatility: (analysis.volatility * 100).toFixed(2),
    },
  ];

  const priceData = Object.entries(analysis.latest_prices || {}).map(
    ([ticker, price]) => ({ ticker, price })
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {/* Portfolio Composition */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Portfolio Composition
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Latest Prices Line Chart */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-center">Latest Prices</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ticker" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#0088FE"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Volatility vs Return Scatter Chart */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Risk vs Return
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="volatility"
              name="Volatility (%)"
              label={{ value: "Volatility", position: "bottom" }}
            />
            <YAxis
              dataKey="return"
              name="Expected Return (%)"
              label={{ value: "Return", angle: -90, position: "insideLeft" }}
            />
            <ZAxis range={[100]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Portfolio" data={scatterData} fill="#FF8042" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
