# ---------- Backend Dockerfile for FinSight ----------
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# Copy requirements first (for caching)
COPY ./finsight_backend/requirements.txt /app/requirements.txt

# Use faster mirror + larger timeout + retries to avoid network timeouts
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple \
    && pip install --upgrade pip \
    && pip install --no-cache-dir -r /app/requirements.txt --timeout=600 --retries=10

# Copy the rest of the backend code
COPY ./finsight_backend /app

# Expose FastAPI port
EXPOSE 8000

# Start the FastAPI server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
