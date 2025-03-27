import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateChannel = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();

  const handleCreateChannel = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a channel.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/channels",
        { name, description, profilePicture },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Channel created successfully!");
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Error creating channel:", error.response?.data);
      alert(error.response?.data?.error || "Failed to create channel.");
    }
  };

  return (
    <div className="create-channel-container">
      <h2>Create Your Channel</h2>
      <form onSubmit={handleCreateChannel}>
        <input
          type="text"
          placeholder="Channel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Channel Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profile Picture URL"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
        <button type="submit">Create Channel</button>
      </form>
    </div>
  );
};

export default CreateChannel;
