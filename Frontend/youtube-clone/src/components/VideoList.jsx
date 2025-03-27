import React, { useEffect, useState } from 'react';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/videos/')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div className="video-list">
      {videos.map(video => (
        <div key={video._id} className="video-card">
          <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
          <h3 className='title'>{video.title}</h3>
          <p className='channel'>{video.channel}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoList;