from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import analyze, predict_volatility  # ✅ Import routers from your v1 folder

# ------------------------------------------------------
# Initialize FastAPI app
# ------------------------------------------------------
app = FastAPI(
    title="FinSight Backend",
    description="Backend API for financial analysis and volatility prediction",
    version="1.0.0",
)

# ------------------------------------------------------
# CORS Configuration
# ------------------------------------------------------
origins = [
    "http://localhost",
    "http://localhost:5173",      # React frontend dev server
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8000",      # Optional (backend self-access)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # In dev, can use ["*"] if testing locally
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------
# Include API routes
# ------------------------------------------------------
app.include_router(analyze.router, prefix="/api/v1", tags=["Portfolio Analysis"])
app.include_router(predict_volatility.router, prefix="/api/v1", tags=["Volatility Prediction"])

# ------------------------------------------------------
# Base Routes (for testing and health)
# ------------------------------------------------------
@app.get("/")
def root():
    """Simple health check route."""
    return {"message": "✅ FinSight Backend is running successfully."}

@app.get("/finance")
def finance_info():
    """Basic info route."""
    return {"status": "ok", "service": "Finance API", "version": "1.0"}

# ------------------------------------------------------
# Run using: uvicorn app.main:app --reload
# ------------------------------------------------------
