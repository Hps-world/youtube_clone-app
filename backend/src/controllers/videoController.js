import Video from "../models/Video.js";

// List all videos
export const listVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("channelId", "channelName description subscribers");
    res.json({ data: videos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single video (with comments + user info)
export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("channelId", "channelName description subscribers")
      .populate({
        path: "comments",
        populate: { path: "user", select: "username email" },
      });

    if (!video) return res.status(404).json({ message: "Video not found" });

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create video
export const createVideo = async (req, res) => {
  try {
    const { title, description, thumbnailUrl, videoUrl, category } = req.body;

    const video = new Video({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channelId: req.user.id, // ⚠️ Replace with channel._id if you separate users & channels
    });

    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete video (and auto-remove comments via hook)
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (video.channelId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await video.deleteOne();
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Like video
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.likes++;
    await video.save();
    res.json({ likes: video.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Dislike video
export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.dislikes++;
    await video.save();
    res.json({ dislikes: video.dislikes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
