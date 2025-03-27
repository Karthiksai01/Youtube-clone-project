import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
      <h4 className="video-title">{video.title}</h4>
      <p className="video-description">{video.description}</p>
    </div>
  );
};

export default VideoCard;
