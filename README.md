# Study Sanctuary - Frontend

The frontend module for the **AIT Study Sanctuary**, an interactive and dynamic full-stack application designed to match scholars into optimized study groups. 

Built with React and Vite, this client consumes the Study Sanctuary REST API to deliver a seamless, state-driven experience, complete with real-time WebSocket communication for collaborative study rooms.

## 🚀 Tech Stack

- **Framework:** React 18, Vite
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Real-Time:** Socket.IO Client
- **Styling:** Vanilla CSS / Tailwind CSS (Optional Configuration)

## ✨ Core Features

- **JWT Authentication:** Secure user registration, login, and protected routes.
- **Dynamic Dashboard:** Real-time academic analytics tracking study hours and algorithmic recommendations for live study sessions.
- **Session Explorer:** Filter, search, join, and create new study sessions dynamically.
- **Collaboration Rooms:** Instant WebSocket-powered text chat rooms integrated directly into active study sessions.

## 📦 Prerequisites

Before running the application, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.14.0 or newer)
- npm or yarn

## 🛠️ Installation & Setup

1. **Clone the repository** and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root of the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5002/api
   ```
   *(Ensure the port matches your backend Node.js server configuration).*

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will run at `http://localhost:5173`.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode using Vite.
- `npm run build` - Builds the app for production to the `dist` folder.
- `npm run preview` - Locally preview the production build.

## 📁 Project Structure

```text
frontend/
├── public/               # Static assets
├── src/
│   ├── api/              # Axios configuration & interceptors
│   ├── components/       # Reusable layout UI components (Sidebar, Topbar)
│   ├── context/          # React Context providers (AuthContext)
│   ├── pages/            # Core route views (Dashboard, Login, Profile, etc.)
│   ├── index.css         # Global stylesheets
│   └── App.jsx           # Main Application routing entrypoint
├── index.html            # HTML template
├── vite.config.js        # Vite build configuration
└── package.json          # Project dependencies & scripts
```
