import React, { useState } from "react";
import { analyzePortfolioAPI, predictVolatilityAPI } from "./api";

function App() {
  // --- Portfolio form state ---
  const [portfolio, setPortfolio] = useState([
    { ticker: "AAPL", weight: 0.6 },
    { ticker: "MSFT", weight: 0.4 },
  ]);
  const [period, setPeriod] = useState("6mo");

  // --- Result & error state ---
  const [analysis, setAnalysis] = useState(null);
  const [predictedVol, setPredictedVol] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Update ticker/weight values ---
  const updateTicker = (index, key, value) => {
    const updated = [...portfolio];
    updated[index][key] = value;
    setPortfolio(updated);
  };

  // --- Add new ticker row ---
  const addTicker = () => {
    setPortfolio([...portfolio, { ticker: "", weight: 0 }]);
  };

  // --- Remove ticker row ---
  const removeTicker = (index) => {
    const updated = portfolio.filter((_, i) => i !== index);
    setPortfolio(updated);
  };

  // --- Call backend: analyze portfolio ---
  const onAnalyze = async (e) => {
    e?.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await analyzePortfolioAPI(portfolio, period);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError(
        "❌ Failed to analyze portfolio: " +
          (err.response?.data?.detail || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Call backend: predict volatility example ---
  const onPredictVol = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await predictVolatilityAPI(0.012, 0.25); // Example values
      setPredictedVol(res.predicted_next_volatility);
    } catch (err) {
      console.error(err);
      setError(
        "❌ Failed to predict volatility: " +
          (err.response?.data?.detail || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* --- Navbar --- */}
      <nav className="bg-blue-700 text-white px-6 py-4 shadow-lg">
        <h1 className="text-2xl font-bold">FinSight Dashboard</h1>
      </nav>

      <main className="p-8 max-w-5xl mx-auto">
        {/* --- Portfolio Form --- */}
        <section className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Enter Portfolio</h2>
          <form onSubmit={onAnalyze}>
            {portfolio.map((p, index) => (
              <div
                key={index}
                className="flex items-center gap-4 mb-3 border-b border-gray-200 pb-2"
              >
                <input
                  type="text"
                  placeholder="Ticker (e.g., AAPL)"
                  value={p.ticker}
                  onChange={(e) =>
                    updateTicker(index, "ticker", e.target.value.toUpperCase())
                  }
                  className="border rounded px-3 py-2 w-1/3"
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Weight"
                  value={p.weight}
                  onChange={(e) =>
                    updateTicker(index, "weight", e.target.value)
                  }
                  className="border rounded px-3 py-2 w-1/3"
                  required
                />
                {portfolio.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTicker(index)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <div className="flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={addTicker}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                + Add Ticker
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
              >
                {loading ? "Analyzing..." : "Analyze Portfolio"}
              </button>

              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="ml-auto border rounded px-3 py-2"
              >
                <option value="3mo">3 Months</option>
                <option value="6mo">6 Months</option>
                <option value="1y">1 Year</option>
              </select>
            </div>
          </form>
        </section>

        {/* --- Analysis Results --- */}
        {analysis && (
          <section className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Portfolio Analysis Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-500">Expected Return</p>
                <p className="text-xl font-bold text-blue-700">
                  {(analysis.expected_return * 100).toFixed(2)}%
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-500">Volatility</p>
                <p className="text-xl font-bold text-green-700">
                  {(analysis.volatility * 100).toFixed(2)}%
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-500">Sharpe Ratio</p>
                <p className="text-xl font-bold text-purple-700">
                  {analysis.sharpe_ratio}
                </p>
              </div>
            </div>

            <h3 className="mt-6 text-lg font-semibold">Latest Prices</h3>
            <ul className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(analysis.latest_prices).map(([ticker, price]) => (
                <li
                  key={ticker}
                  className="border rounded-lg p-3 bg-gray-50 text-center"
                >
                  <span className="font-semibold">{ticker}</span>: $
                  {price.toFixed(2)}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* --- Volatility Prediction --- */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Predict Volatility</h2>
          <button
            onClick={onPredictVol}
            disabled={loading}
            className="px-5 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
          >
            {loading ? "Predicting..." : "Run Example Prediction"}
          </button>
          {predictedVol && (
            <p className="mt-4 text-lg">
              📈 Predicted Next Volatility:{" "}
              <span className="font-semibold text-green-700">
                {predictedVol.toFixed(6)}
              </span>
            </p>
          )}
        </section>

        {/* --- Error Message --- */}
        {error && (
          <div className="mt-6 bg-red-100 border border-red-300 text-red-700 p-4 rounded">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
