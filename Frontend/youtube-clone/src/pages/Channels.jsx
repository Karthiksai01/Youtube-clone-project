import React, { useEffect, useState } from "react";

const Channels = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/channels");
        const data = await response.json();
        setChannels(data);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
  }, []);

  return (
    <div>
      <h2>Channels</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel._id}>
            <img src={channel.profilePicture || "/default-avatar.png"} alt={channel.name} width="50" />
            <h3>{channel.name}</h3>
            <p>{channel.description}</p>
            <p>Subscribers: {channel.subscribers}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
