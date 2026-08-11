# DevOps-Friendly URL Shortener

A modern full-stack URL shortener built with React, Tailwind CSS, Node.js, Express, MongoDB, Redis, and Docker.

## Features

- User registration and JWT authentication
- Create short links with custom alias support
- Click analytics, recent links, and most visited reports
- Redis caching for fast redirect performance
- QR code generation for each short URL
- URL expiration support
- Docker Compose for local dev: frontend, backend, MongoDB, Redis
- Production-ready structure for Vercel/Render/Railway deployment

## Project Structure

- `backend/` - Express API server
- `frontend/` - React + Vite UI
- `docker-compose.yml` - Local service orchestration

## Local Setup

### Prerequisites

- Node.js 20+
- Docker and Docker Compose
- MongoDB and Redis via Docker Compose

### Run with Docker Compose

1. Copy environment templates

```bash
cd c:/Users/hp/OneDrive/Desktop/url-shortner
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

2. Start the services

```bash
docker compose up --build
```

3. Visit

- Frontend: `http://localhost:4173`
- Backend: `http://localhost:5000`

## Backend

### Available API endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/urls` - Fetch user URLs and analytics
- `GET /api/urls/analytics` - Fetch dashboard analytics
- `POST /api/urls` - Create shortened URL
- `DELETE /api/urls/:id` - Delete URL
- `GET /r/:code` - Redirect short code to original URL

## Frontend

- Uses React Router for routing
- Axios for API calls with JWT auth header
- Tailwind CSS for a modern SaaS-style dashboard

## Deployment Notes

- Frontend can deploy to Vercel using the Vite build process
- Backend can deploy to Render/Railway with environment variables
- Use MongoDB Atlas and a managed Redis service for production

## Notes

- Update `backend/.env` and `frontend/.env` with your production values
- In production, use a secure `JWT_SECRET` and private environment storage
