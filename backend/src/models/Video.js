import mongoose from "mongoose";
import Channel from "./Channel.js";
import Comment from "./Comment.js";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    thumbnailUrl: { type: String },
    videoUrl: { type: String, required: true },
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
    category: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

// After saving, push video into channel.videos
videoSchema.post("save", async function (doc) {
  try {
    await Channel.findByIdAndUpdate(doc.channelId, {
      $addToSet: { videos: doc._id },
    });
  } catch (err) {
    console.error("Failed to update channel.videos:", err.message);
  }
});

// When deleting a video → delete its comments
videoSchema.post("deleteOne", { document: true, query: false }, async function (doc) {
  try {
    await Comment.deleteMany({ videoId: doc._id });
  } catch (err) {
    console.error("Failed to delete comments for video:", err.message);
  }
});

export default mongoose.model("Video", videoSchema);
