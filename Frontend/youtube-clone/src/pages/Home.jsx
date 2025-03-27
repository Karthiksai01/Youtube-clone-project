import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const extractVideoId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^"&?/ ]{11})/);
  return match ? match[1] : null;
};

const categories = ["All", "Songs", "Tech", "Mixes", "Sports", "Reaction Videos", "Movies", "Vlogs"];

const Home = ({ searchQuery }) => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/videos");
        const videoList = response.data || [];
        setVideos(videoList);
        setFilteredVideos(videoList);
        console.log("Fetched Videos:", videoList);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    let filtered = videos;

    // 🔹 Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 🔹 Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((video) => video.category === selectedCategory);
    }

    setFilteredVideos(filtered);
  }, [searchQuery, videos, selectedCategory]);

  return (
    <div>
      {/* 🔹 Filter Bar */}
      <div className="filter-bar">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`filter-button ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 🔹 Videos Container */}
      <div className="videos-container">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => {
            const videoId = extractVideoId(video?.videoUrl);

            return (
              <Link to={`/video/${videoId}`} key={index} className="video-card">
                {/* Thumbnail */}
                {videoId ? (
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                    alt={video?.title || "YouTube Video"}
                    className="thumbnail"
                  />
                ) : (
                  <p>Thumbnail not available</p>
                )}

                {/* Title & Channel Name */}
                <h3 className="video-title">{video?.title || "Untitled Video"}</h3>
                <p className="channel-name">{video?.channelName || "Unknown Channel"}</p>
              </Link>
            );
          })
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
