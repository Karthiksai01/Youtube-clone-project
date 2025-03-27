import express from "express";
import Channel from "../models/Channel.js";
import { verifyToken } from "../middleware/upload.js";

const router = express.Router();

// Create a Channel
router.post("/", verifyToken, async (req, res) => {
  console.log("User creating channel:", req.user); // Debugging

  try {
    const { name, description, profilePicture } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. Please log in first." });
    }

    const newChannel = new Channel({
      name,
      description,
      profilePicture,
      owner: req.user.id, // Make sure `req.user.id` is set
    });

    await newChannel.save();
    res.status(201).json(newChannel);
  } catch (err) {
    console.error("Error creating channel:", err.message);
    res.status(500).json({ error: err.message });
  }
});


//  Get a Channel by ID
router.get("/", verifyToken, async (req, res) => {
  console.log("User making request:", req.user);

  try {
    const channels = await Channel.find();
    res.json(channels);
  } catch (err) {
    console.error(" Error fetching channels:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Subscribe to a Channel
router.put("/:id/subscribe", verifyToken, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    if (!channel.subscribedUsers.includes(req.user.id)) {
      channel.subscribedUsers.push(req.user.id);
      channel.subscribers += 1;
      await channel.save();
      res.json({ message: "Subscribed successfully!" });
    } else {
      res.status(400).json({ message: "Already subscribed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Unsubscribe from a Channel
router.put("/:id/unsubscribe", verifyToken, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    channel.subscribedUsers = channel.subscribedUsers.filter(user => user.toString() !== req.user.id);
    channel.subscribers -= 1;
    await channel.save();

    res.json({ message: "Unsubscribed successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
