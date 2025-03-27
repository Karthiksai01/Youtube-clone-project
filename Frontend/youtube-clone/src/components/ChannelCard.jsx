import React from "react";
import { useNavigate } from "react-router-dom";

const ChannelCard = ({ channel }) => {
  const navigate = useNavigate();

  return (
    <div className="channel-card" onClick={() => navigate(`/channel/${channel._id}`)}>
      <img src={channel.profilePicture || "/default-profile.png"} alt={channel.name} className="channel-img" />
      <h3>{channel.name}</h3>
      <p>{channel.description}</p>
      <span>{channel.subscribers} subscribers</span>
    </div>
  );
};

export default ChannelCard;
