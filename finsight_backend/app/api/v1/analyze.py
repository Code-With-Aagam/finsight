from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.portfolio_service import analyze_portfolio

router = APIRouter()

class PortfolioItem(BaseModel):
    ticker: str
    weight: float

class AnalyzeRequest(BaseModel):
    portfolio: list[PortfolioItem]
    period: str = "6mo"

@router.post("/analyze")
def analyze_portfolio_endpoint(request: AnalyzeRequest):
    try:
        result = analyze_portfolio(
            [{"ticker": p.ticker, "weight": p.weight} for p in request.portfolio],
            request.period
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
