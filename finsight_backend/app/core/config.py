from pydantic import BaseSettings

class Settings(BaseSettings):
    API_VERSION: str = "v1"
    MODEL_PATH: str = "/app/models/volatility_model.joblib"

settings = Settings()
