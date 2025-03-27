import express from "express";
import Comment from "../models/commentModel.js";
import { verifyToken } from "../middleware/upload.js";

const router = express.Router();

// ✅ Add a Comment
router.post("/", verifyToken, async (req, res) => {
  try {
    const newComment = new Comment({
      videoId: req.body.videoId,
      userId: req.user.id,
      text: req.body.text,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Comments for a Video
router.get("/:videoId", async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).populate("userId", "username");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a Comment (Only Owner)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
