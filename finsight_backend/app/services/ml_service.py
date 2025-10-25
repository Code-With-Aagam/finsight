import os
import joblib
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), "../../../ml/models/volatility_model.joblib")

_model = None

def load_model():
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
        _model = joblib.load(MODEL_PATH)
    return _model


def predict_volatility(return_value: float, current_volatility: float) -> float:
    model = load_model()
    X = np.array([[return_value, current_volatility]])
    prediction = model.predict(X)[0]
    return float(prediction)
