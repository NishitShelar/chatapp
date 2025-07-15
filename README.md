# Breeze Chat App Frontend

A modern, fully responsive, and themeable chat application frontend built with React, Tailwind CSS, and DaisyUI. Breeze delivers a lively, glassy, and professional chat experience for teams, friends, and everyone in between.

## Features
- Secure, real-time messaging UI
- Modern, glassy, and lively design
- Fully mobile responsive (WhatsApp-style mobile UX)
- Sidebar with contacts, online status, and search
- Themed backgrounds, cards, and text (DaisyUI themes)
- Animated hero, testimonials, and landing page
- Profile, settings, and authentication pages
- Image upload with camera capture and compression
- Robust navigation and error handling

## Tech Stack
- React 18+
- Tailwind CSS 3+
- DaisyUI
- Vite
- browser-image-compression
- Lucide React Icons
- Axios
- Node.js (backend)
- Express (backend)
- MongoDB (backend)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)
- MongoDB (local or Atlas)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/NishitShelar/chatapp.git
   cd chatapp
   ```

---

## Frontend Setup

1. Go to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in any required environment variables (API base URL, etc).
4. Start the frontend:
   ```sh
   npm run dev
   ```
- The app will be available at `http://localhost:5173` by default.

---

## Backend Setup

1. Go to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your environment variables (MongoDB URI, JWT secret, etc).
4. Start the backend:
   ```sh
   npm start
   ```
- The backend will run on the port specified in your `.env` (default is usually `5000`).

---

## Troubleshooting
- If you encounter issues with camera/image upload, ensure you are using a supported mobile browser (Chrome/Android, Safari/iOS) and serving the app over HTTPS.
- For CORS/API errors, check your backend API URL and CORS settings.

---
