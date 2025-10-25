from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.portfolio_service import analyze_portfolio

router = APIRouter()

class PortfolioItem(BaseModel):
    ticker: str
    weight: float

class PortfolioRequest(BaseModel):
    portfolio: List[PortfolioItem]

@router.post("/analyze")
def analyze(req: PortfolioRequest):
    try:
        result = analyze_portfolio([p.dict() for p in req.portfolio])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
