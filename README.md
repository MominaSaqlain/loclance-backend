# loclance-backend
Backend for Loclance project. Built with Node.js, Express, and MongoDB. Handles authentication, job management, proposals, and user data.
# Loclance Backend

This is the **backend API** for the Loclance freelancing platform.  
It is built using **Node.js, Express, and MongoDB** and provides all the server-side functionality and APIs for the application.

---

## 🚀 Features
- User authentication (Register/Login with JWT)
- MongoDB database connection with Mongoose
- Job feed API
- Proposals API
- Leads API
- Dashboard analytics endpoints

---

## ⚙️ Tech Stack
- Node.js
- Express.js
- MongoDB (Atlas / Local)
- JWT (JSON Web Token) for authentication
- Mongoose (ODM)

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/loclance-backend.git
   cd loclance-backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the root and add:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Run the development server:

bash
Copy
Edit
npm run dev
📡 API Endpoints (Examples)
Auth

POST /api/register → Register a new user

POST /api/login → Login user

Jobs

GET /api/jobs → Fetch job listings

Proposals

POST /api/proposals → Create new proposal

Leads

GET /api/leads → Get leads list

📌 Notes
This backend is connected with the frontend (Next.js).

Make sure to run MongoDB (Atlas or Local) before starting the server.

📜 License
This project is for educational/internship purposes only.

yaml
Copy
Edit

---

  

⚡ Suggestion: Backend README me **installation steps + environment variables + API endpoints** likhna sabse zaroori hai.  
