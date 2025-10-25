import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib
import os

def extract_close_column(data, ticker):
    """
    Handles all possible formats of yfinance DataFrame and returns
    a clean 'Close' price series for the given ticker.
    """
    # If MultiIndex columns exist
    if isinstance(data.columns, pd.MultiIndex):
        # Look for any level containing 'Close'
        for col in data.columns:
            if "Close" in col:
                return data[col].rename("Close")
        # If still not found
        print(f"No 'Close' found for {ticker} in MultiIndex columns: {list(data.columns)}")
        return None
    else:
        # Simple columns (old yfinance format)
        if "Close" in data.columns:
            return data["Close"]
        elif ticker in data.columns.get_level_values(0):
            return data[ticker]["Close"]
        else:
            print(f"No 'Close' found for {ticker}. Columns: {list(data.columns)}")
            return None


def train_volatility_model():
    tickers = ["AAPL", "MSFT", "GOOG", "AMZN", "TSLA"]
    all_data = []

    for t in tickers:
        print(f"\nDownloading {t} ...")
        try:
            data = yf.download(t, period="1y", progress=False, auto_adjust=True)
        except Exception as e:
            print(f"Failed to download {t}: {e}")
            continue

        if data.empty:
            print(f"Skipping {t}: empty data.")
            continue

        # --- Extract Close column safely ---
        close_series = extract_close_column(data, t)
        if close_series is None or close_series.empty:
            print(f"Skipping {t}: could not extract valid Close data.")
            continue
        # -----------------------------------

        df = pd.DataFrame({
            "Date": close_series.index,
            "Close": close_series.values
        })
        df["Ticker"] = t
        df["Return"] = df["Close"].pct_change(fill_method=None)
        df["Volatility"] = df["Return"].rolling(window=5, min_periods=1).std()
        df["NextVolatility"] = df["Volatility"].shift(-1)
        df = df.dropna(subset=["Return", "Volatility", "NextVolatility"])

        if len(df) < 10:
            print(f"Skipping {t}: insufficient cleaned data.")
            continue

        all_data.append(df)

    if not all_data:
        raise ValueError("No valid data for any ticker. Please retry later or update yfinance.")

    combined = pd.concat(all_data)
    print(f"Combined dataset shape: {combined.shape}")

    X = combined[["Return", "Volatility"]]
    y = combined["NextVolatility"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training GradientBoostingRegressor ...")
    model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, random_state=42)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, preds))
    print(f"Model trained successfully. RMSE = {rmse:.6f}")

    os.makedirs("ml/models", exist_ok=True)
    model_path = "ml/models/volatility_model.joblib"
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_volatility_model()
