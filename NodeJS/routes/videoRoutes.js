import express from "express";
import upload from "../middleware/upload.js";
import Video from "../models/VideoModel.js";

const router = express.Router();

// Upload video
router.post("/upload", upload.single("video"), async (req, res) => {
    try {
      const { title, description,video,channelName,category} = req.body;
  
      let videoUrl = video; // If the user provides a URL, use it.
  
      // If a file is uploaded, use the file path
      if (req.file) {
        videoUrl = req.file.path;
      }
  
      if (!videoUrl) {
        return res.status(400).json({ error: "No video file or URL provided" });
      }
  
      const newVideo = new Video({ title, description, videoUrl,channelName,category});
      await newVideo.save();
  
      res.status(201).json({ message: "Video uploaded successfully!", newVideo });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  // Get all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find(); // Fetch all videos
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id/like", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    video.likes += 1; // Increment like count
    await video.save();
    res.status(200).json({ message: "Video liked!", likes: video.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Fetch related videos (excluding the current one)
router.get("/related/:id", async (req, res) => {
  try {
    const currentVideo = await Video.findById(req.params.id);
    if (!currentVideo) return res.status(404).json({ error: "Video not found" });

    // Find videos that are NOT the current one (you can enhance this with categories later)
    const relatedVideos = await Video.find({
      _id: { $ne: req.params.id }, // Exclude current video
    })
      .sort({ createdAt: -1 }) // Show latest first
      .limit(5); // Get 5 related videos

    res.status(200).json(relatedVideos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
