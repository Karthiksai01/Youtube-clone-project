import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Channels from "./pages/Channels"; 
import Video from "./pages/Video";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateChannel from "./pages/CreateChannel";
import "./styles/styles.css";

const AppContent = () => {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch videos from the backend API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/videos"); // Adjust URL as per your backend
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const toggleSidebar = () => {
    console.log("Sidebar toggled:", !sidebarCollapsed);
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Hide Navbar & Sidebar on the login page
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app-container">
      {!isLoginPage && <Navbar toggleSidebar={toggleSidebar} setSearchQuery={setSearchQuery}/>}
      <div className="main-content">
        {!isLoginPage && <Sidebar collapsed={sidebarCollapsed} />}
        <div className="content">
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/" element={<Home videos={videos} searchQuery={searchQuery} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/video/:videoId" element={<Video videos={videos} />} />
              <Route path="/channels" element={<Channels />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-channel" element={<CreateChannel />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
