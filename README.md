# 💹 FinSight — AI-Powered Financial Insights Dashboard

> FinSight is a **full-stack financial analytics web app** that combines **FastAPI**, **React (Vite)**, and **Docker Compose** to deliver portfolio insights, risk metrics, and data-driven visualizations through a seamless, modern interface.

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.120-green?logo=fastapi)
![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Docker](https://img.shields.io/badge/Docker-Enabled-informational?logo=docker)
![License](https://img.shields.io/badge/License-MIT-yellow?logo=open-source-initiative)
![Status](https://img.shields.io/badge/Status-Active-success)
![Contributions](https://img.shields.io/badge/Contributions-Welcome-brightgreen)

---

## 🌟 Overview

**FinSight** helps users analyze and optimize their investment portfolios by calculating performance metrics such as:
- 📈 **Expected Return**
- 📊 **Volatility**
- 🧮 **Sharpe Ratio**
- 💵 **Latest Prices**

The **FastAPI backend** computes analytics using live market data (via `yfinance`), while the **React frontend** presents an intuitive dashboard for visualization.


## 🚀 Features

- 📊 **Portfolio Analytics** — Calculates expected returns, volatility, and Sharpe ratios  
- ⚡ **High-Performance Backend** — Asynchronous API powered by FastAPI  
- 💻 **Modern Frontend UI** — Built with React, Tailwind CSS, and ShadCN UI  
- 🧠 **Data-Driven Insights** — Uses yfinance & NumPy for financial analysis  
- 🐳 **Dockerized Deployment** — Run both frontend & backend with a single command  
- 🧩 **Modular ML Layer** — Ready for machine learning integration and predictions  

---

## 🛠️ Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | React (Vite) · Tailwind CSS · ShadCN UI · Axios · Recharts |
| **Backend** | FastAPI · Pandas · NumPy · yfinance |
| **Infrastructure** | Docker · Docker Compose |
| **Version Control** | Git + GitHub |

---

## 📂 Project Structure

```
finsight/
├── finsight_backend/       # FastAPI backend (business logic + routes)
│   ├── app/
│   ├── main.py
│   └── requirements.txt
├── finsight_frontend/      # React frontend (Vite app)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── ml/                     # Machine Learning utilities (optional)
├── docker-compose.yml      # Multi-container orchestration
├── Dockerfile              # Backend container
├── Dockerfile.frontend     # Frontend container
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Code-With-Aagam/finsight.git
cd finsight
```

### 2️⃣ Build and Run Containers
```bash
docker compose up --build
```

### 3️⃣ Access the Application
- **Frontend:** http://localhost:5173  
- **Backend (API Docs):** http://localhost:8000/docs  

---

## 🧠 API Endpoints

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/v1/analyze` | `POST` | Analyze portfolio tickers and weights |
| `/docs` | `GET` | Access Swagger UI for interactive API testing |
| `/openapi.json` | `GET` | Retrieve OpenAPI schema for API integration |

---

## 💻 Frontend Overview

- Developed using **React + Vite** for blazing-fast builds  
- Communicates with FastAPI backend via **Axios**  
- Styled using **Tailwind CSS** and **ShadCN UI** for a clean, professional look  
- Renders:
  - Portfolio composition  
  - Expected return  
  - Volatility  
  - Sharpe ratio  
  - Latest stock prices  

---

## ☁️ Deployment Guide

You can deploy FinSight using any container-supporting platform like **Render**, **Railway**, **AWS**, or **Azure**.

### 🚀 Example: Deploy on Render
1. Push your repository to GitHub  
2. Create a new Web Service on [Render](https://render.com)  
3. Choose "Deploy Docker App"  
4. Build command:
   ```bash
   docker compose up --build
   ```
5. Expose ports:
   - `8000` for backend
   - `5173` for frontend  

---

## 🧭 Roadmap / Future Enhancements

- [ ] 🔮 Real-time Stock Market Integration (Polygon.io / AlphaVantage)  
- [ ] 📈 Predictive Modeling (LSTM, ARIMA, Prophet)  
- [ ] 🔐 User Authentication (JWT-based)  
- [ ] 🌓 Dark Mode Toggle  
- [ ] ⚙️ CI/CD Pipeline (GitHub Actions + DockerHub)  
- [ ] 💬 AI Chatbot Financial Advisor (LLM integration)  

---

## 🧩 Contributing

Contributions are always welcome! 🎉  

1. Fork this repo 🍴  
2. Create a new branch  
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit changes  
   ```bash
   git commit -m "Added new feature"
   ```
4. Push your branch  
   ```bash
   git push origin feature/YourFeature
   ```
5. Create a Pull Request ✨

---

## 🧑‍💻 Author

**👤 Aagam Shah**  
🎓 *Data Science Enthusiast | Full-Stack ML Developer*  

🔗 **Links:**  
- [GitHub](https://github.com/Code-With-Aagam)  
- [LinkedIn](https://www.linkedin.com/in/aagam-shah)  

---

## 🪪 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute it with proper attribution.

---

## 💬 Acknowledgements

A huge thanks to the open-source community and the libraries that make FinSight possible:

- [FastAPI](https://fastapi.tiangolo.com/)  
- [React + Vite](https://vitejs.dev/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [ShadCN UI](https://ui.shadcn.com/)  
- [yfinance](https://pypi.org/project/yfinance/)  
- [Docker](https://www.docker.com/)

---

## 🌟 Support & Feedback

If you find **FinSight** helpful, please consider giving it a ⭐ on GitHub!  
Your feedback and contributions help make this project better.

---

## 📚 Quick Summary

| Section | Description |
|----------|-------------|
| 🧠 **Goal** | Financial portfolio analytics dashboard |
| 🧰 **Stack** | FastAPI (backend), React (frontend), Docker |
| 💾 **Data Source** | Yahoo Finance via yfinance |
| ⚙️ **Setup Command** | `docker compose up --build` |
| 🌐 **Access** | Frontend → `localhost:5173`, Backend → `localhost:8000/docs` |
| 🧠 **Future Scope** | ML-based predictions, cloud deployment, user authentication |

---

⭐ **Star this repo if you liked it!**  
Built with ❤️ by **Aagam Shah**
