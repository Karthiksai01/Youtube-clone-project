import React, { useEffect, useState } from "react";
import { FaBars, FaSearch, FaBell, FaUserCircle, FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const Navbar = ({ toggleSidebar, setSearchQuery }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(search); // Update search state in parent component
  };

  const handleCreateChannel = () => {
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
    } else {
      navigate("/create-channel");
    }
  };

  return (
    <nav className="navbar">
      <FaBars className="menu-icon" onClick={toggleSidebar} />
      <div className="logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcgDC5KbVCgEGLQgwB22LXxPNb4jBvyHwLmw&s"
          alt="Logo"
        />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="search-icon" onClick={handleSearch} />
        <FaMicrophone className="icon-m" />
      </div>
      <div className="nav-left">
        <button className="create-channel-btn" onClick={handleCreateChannel}>
          Create Channel
        </button>
        <FaBell className="icon" />
        {user ? (
          <div className="profile-menu">
            <img
              src={user.profilePicture || "https://via.placeholder.com/40"}
              alt="Profile"
              className="profile-pic"
              onClick={handleLogout}
            />
          </div>
        ) : (
          <FaUserCircle className="profile-icon" onClick={() => navigate("/login")} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
