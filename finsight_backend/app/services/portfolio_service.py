# robust portfolio analyzer using yfinance
import yfinance as yf
import numpy as np
import pandas as pd

def _fetch_adjusted_close(tickers, period="6mo"):
    # yfinance returns many shapes — handle them
    data = yf.download(tickers, period=period, group_by="ticker", progress=False, auto_adjust=True)
    # build DataFrame with Close for each ticker
    if isinstance(data.columns, pd.MultiIndex):
        # multi-index e.g. ('Price','Close','AAPL') or (ticker, 'Close')
        adj = {}
        for t in tickers:
            # try a bunch of ways to find the close series
            if (t, "Close") in data.columns:
                adj[t] = data[t]["Close"]
            else:
                # find any column tuple that contains Close and ticker
                found = [col for col in data.columns if "Close" in str(col) and t in str(col)]
                if found:
                    adj[t] = data[found[0]]
                else:
                    # try top-level 'Close' if single ticker returned grouped differently
                    if "Close" in data.columns:
                        adj[t] = data["Close"]
        if not adj:
            raise ValueError("No price columns found in yfinance response")
        df = pd.DataFrame(adj)
    else:
        # single-level columns (Close exists)
        if len(tickers) == 1:
            # data is a DataFrame with columns like 'Close' (single ticker)
            if "Close" in data.columns:
                df = data["Close"].to_frame(name=tickers[0])
            else:
                raise ValueError("Close column not found")
        else:
            # multiple tickers with simple column structure (rare)
            adj = {}
            for t in tickers:
                sub = yf.download(t, period=period, progress=False, auto_adjust=True)
                if "Close" in sub.columns:
                    adj[t] = sub["Close"]
            df = pd.DataFrame(adj)
    return df.dropna()

def analyze_portfolio(portfolio, period="6mo"):
    """
    portfolio: list of dicts [{ "ticker": "AAPL", "weight": 0.6 }, ...]
    returns dict with expected_return, volatility, sharpe_ratio, latest_prices
    """
    tickers = [p["ticker"].upper() for p in portfolio]
    weights = np.array([float(p["weight"]) for p in portfolio], dtype=float)
    if weights.sum() == 0:
        raise ValueError("Weights sum to zero")
    weights = weights / weights.sum()

    df = _fetch_adjusted_close(tickers, period=period)
    if df.empty:
        raise ValueError("No price data retrieved")

    # daily returns
    returns = df.pct_change().dropna()
    mean_returns = returns.mean()
    cov = returns.cov()

    # annualize (252 trading days)
    expected_return = float(np.dot(mean_returns, weights) * 252)
    volatility = float(np.sqrt(np.dot(weights.T, np.dot(cov * 252, weights))))
    sharpe = float(expected_return / volatility) if volatility != 0 else 0.0

    latest_prices = df.iloc[-1].to_dict()

    return {
        "tickers": tickers,
        "expected_return": round(expected_return, 6),
        "volatility": round(volatility, 6),
        "sharpe_ratio": round(sharpe, 4),
        "latest_prices": {k: float(round(v, 6)) for k, v in latest_prices.items()},
    }
