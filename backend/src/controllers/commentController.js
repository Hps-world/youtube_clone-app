import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

// Add comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const videoId = req.params.videoId;

    const comment = new Comment({ text, user: req.user.id, videoId });
    await comment.save();

    await Video.findByIdAndUpdate(videoId, { $push: { comments: comment._id } });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get comments for a video
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate("user", "username email");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit comment
export const editComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.text = req.body.text || comment.text;
    await comment.save();

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
