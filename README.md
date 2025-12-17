# 🧑‍💼 WorkBuddy

WorkBuddy is a full-stack monorepo application built with **React** (frontend) and **Node.js** (backend).
It is a Work Session tracker that helps users track and manage their workshifts.
The project is organized into two separate applications within a single repository to simplify development and coordination.

---

## 📁 Project Structure

WorkBuddy/
├── WorkBuddyFrontend/   # React frontend
├── WorkBuddyBackend/    # Node.js backend
└── README.md

# 🚀 Getting Started
Prerequisites

Make sure you have the following installed:
Node.js (v16+ recommended)
npm (comes with Node.js)

# 🔐 Backend Setup
Navigate to the backend folder:

cd WorkBuddyBackend

1. Create a Mongodb Database and edit .env file adding the required variables:
  PORT=5000
  DATABASE_URL=your_database_url
  JWT_SECRET=your_jwt_secret

2. Install depedencies and run backend
  npm install
  npm run dev
(The backend will start in development mode.)

# 🎨 Frontend Setup

Open a new terminal and navigate to the frontend folder:
cd WorkBuddyFrontend

Install dependencies and start the dev server:

  npm install
  npm run dev

# 🔁 Running the App

1. Start WorkBuddyBackend (after .env setup)

2. Start WorkBuddyFrontend

The frontend communicates with the backend API


# 🛠️ Tech Stack
MERN STACK
MongoDB Express.js React.js Node.js
