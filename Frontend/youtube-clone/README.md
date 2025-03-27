# React + Vite
# YouTube Clone (MERN Stack)

## 📌 Project Overview
This is a **YouTube Clone** built using the **MERN stack (MongoDB, Express, React, Node.js)**. The application replicates core YouTube functionalities such as displaying videos, searching for content, viewing related videos, and user authentication.

## 🚀 Features
### ✅ **Frontend (React & Vite)**
- **Home Page**
  - YouTube-style header with a search bar
  - Sidebar with category filters (collapsible in mobile view)
  - Grid layout for displaying video thumbnails
- **Video Page**
  - Clicking a video opens it in a new tab
  - Related videos displayed on the right
  - Channel name, likes, comments section below the video
- **Authentication**
  - Login and Signup pages with validation
  
### ✅ **Backend (Node.js, Express & MongoDB)**
- RESTful API for handling user authentication and video data
- User login and signup with JWT authentication
- MongoDB database for storing user and video details

## 🛠️ Technologies Used
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, JWT for authentication
- **Database:** MongoDB (Mongoose ODM)

## 🏗️ Folder Structure
```
- youtube-clone/
  - backend/
    - models/
    - routes/
    - controllers/
    - server.js
  - frontend/
    - src/
      - components/
      - pages/
      - assets/
      - styles/
      - App.jsx
      - main.jsx
    - public/
    - index.html
    - package.json
    - vite.config.js
```

## 💻 Installation & Setup
### 🔹 Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+)
- **MongoDB** (local or cloud instance)

### 🔹 Backend Setup
1. Navigate to the `backend/` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### 🔹 Frontend Setup
1. Navigate to the `frontend/` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

## 🌟 Future Enhancements
- Implement video upload and streaming
- Improve search functionality with filters
- Add user profiles and subscriptions

## 📜 License
This project is open-source and available under the MIT License.

by Karthiksaibayya

