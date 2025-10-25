from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ml_service import predict_volatility

router = APIRouter()

class PredictRequest(BaseModel):
    return_value: float
    current_volatility: float

class PredictResponse(BaseModel):
    predicted_next_volatility: float

@router.post("/predict-volatility", response_model=PredictResponse)
def predict_volatility_endpoint(req: PredictRequest):
    try:
        result = predict_volatility(req.return_value, req.current_volatility)
        return {"predicted_next_volatility": round(result, 6)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
