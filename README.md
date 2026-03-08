# MERN Notes / Blog Application

A full-stack Notes application built with the MERN stack (MongoDB, Express.js, React, Node.js) and JWT authentication. Users can register, log in, and manage their own notes with title, body, category, and created date. Notes are sorted by latest and can be filtered by category.

## Features

- **User authentication**: Register (name, email, password) and login with JWT stored in `localStorage`
- **Notes CRUD**: Create, view, edit, and delete notes
- **Note fields**: Title, body, category (tag), and created/updated dates
- **Filter by category** on the frontend
- **Protected routes**: Only authenticated users can access notes; users see only their own notes

## Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), bcryptjs, jsonwebtoken, express-validator
- **Frontend**: React (Vite), React Router, Context API, CSS

## Project Structure

```
├── backend/          # Express API
│   ├── config/       # DB connection
│   ├── controllers/  # Auth & note controllers
│   ├── middleware/   # JWT auth middleware
│   ├── models/       # User & Note schemas
│   ├── routes/       # Auth & note routes
│   ├── server.js
│   └── .env.example
├── frontend/         # React app
│   ├── src/
│   │   ├── api/      # API client
│   │   ├── components/
│   │   ├── context/  # AuthContext
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env.example
├── README.md
└── .env.example      # Summary of env vars (see backend/frontend for actual files)
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or later recommended)
- MongoDB (local or Atlas connection string)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and set:

- `PORT` – e.g. `5000`
- `MONGODB_URI` – your MongoDB connection string (e.g. `mongodb://localhost:27017/mern-notes`)
- `JWT_SECRET` – a strong secret for signing JWTs

Start the backend:

```bash
npm run dev
```

Server runs at `http://localhost:5000`.

### 3. Frontend setup

In a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `frontend/.env` if needed:

- `VITE_API_BASE_URL` – backend API base (default `http://localhost:5000/api` when using Vite proxy, or set explicitly)

Start the frontend:

```bash
npm run dev
```

App runs at `http://localhost:3000` (Vite proxy forwards `/api` to the backend).

### 4. Run the application

1. Ensure MongoDB is running.
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm run dev`
4. Open `http://localhost:3000`, register or log in, and create notes.

## API Overview

- **Auth**
  - `POST /api/auth/register` – register (name, email, password)
  - `POST /api/auth/login` – login (email, password)
  - `GET /api/auth/me` – current user (requires Bearer token)

- **Notes** (all require Bearer token)
  - `GET /api/notes` – list user’s notes (optional query: `?category=...`), sorted by latest
  - `GET /api/notes/:id` – get one note
  - `POST /api/notes` – create (title, body, category)
  - `PUT /api/notes/:id` – update
  - `DELETE /api/notes/:id` – delete

## Environment Files

- `backend/.env.example` – backend variables (copy to `backend/.env`)
- `frontend/.env.example` – frontend variables (copy to `frontend/.env`)

See those files for required keys and example values.

## License

MIT
