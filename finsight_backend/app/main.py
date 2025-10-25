from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import routes, predict

# --------------------------
# Initialize FastAPI App
# --------------------------
app = FastAPI(
    title="FinSight API",
    version="0.1.0",
    description="Backend service for FinSight Finance Dashboard"
)

# --------------------------
# CORS Middleware (for frontend access)
# --------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # You can replace "*" with ["http://localhost:5173"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------
# Include Routers
# --------------------------
# Make sure routes.py and predict.py both have 'router = APIRouter()'
app.include_router(routes.router, prefix="/api/v1", tags=["Portfolio Analysis"])
app.include_router(predict.router, prefix="/api/v1", tags=["Volatility Prediction"])

# --------------------------
# Root & Finance Status Endpoints
# --------------------------
@app.get("/")
def root():
    return {"status": "ok", "service": "FinSight Backend running"}

@app.get("/finance")
def finance_status():
    return {"status": "ok", "message": "FinSight Finance API is operational"}


@app.on_event("startup")
async def startup_event():
    print("\n Registered Routes:")
    for route in app.routes:
        print(f"→ {route.path} [{','.join(route.methods)}]")
