import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCompass, FaMusic, FaHistory, FaVideo, FaDownload, FaStream, FaBook } from 'react-icons/fa';
import '../styles/styles.css';

const Sidebar = ({ collapsed }) => {
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <ul>
        <li className="sidebar-item">
          <Link to="/" className="sidebar-link">
            <FaHome className="icon" /> {!collapsed && <span>Home</span>}
          </Link>
        </li>
        <li className="sidebar-item"><FaCompass className="icon" /> {!collapsed && 'Explore'}</li>
        <li className="sidebar-item"><FaStream className="icon" /> {!collapsed && 'Subscription'}</li>
        <li className="sidebar-item"><FaMusic className="icon" /> {!collapsed && 'Music'}</li>
        <li className="sidebar-item"><FaBook className="icon" /> {!collapsed && 'Library'}</li>
        <li className="sidebar-item"><FaHistory className="icon" /> {!collapsed && 'History'}</li>
        <li className="sidebar-item"><FaVideo className="icon" /> {!collapsed && 'Your Videos'}</li>
        <li className="sidebar-item"><FaDownload className="icon" /> {!collapsed && 'Downloads'}</li>
      </ul>
    </div>
  );
};

export default Sidebar;
