import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Channel from "../models/Channel.js";
import Video from "../models/Video.js";
import connectDB from "../config/db.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    // Clear old data
    await User.deleteMany();
    await Channel.deleteMany();
    await Video.deleteMany();

    // Demo user
    const user = new User({
      username: "demo",
      email: "demo@example.com",
      password: "password", // ⚠️ not hashed here
      subscriptions: [],
    });
    await user.save();

    // Channel categories
    const channelData = [
      { name: "Music Zone", description: "Best music hits 🎵" },
      { name: "Gaming World", description: "Latest gaming content 🎮" },
      { name: "Tech Reviews", description: "Unboxings and reviews 💻" },
      { name: "News Daily", description: "Latest updates 📰" },
    ];

    const videoSamples = [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=9bZkp7q19f0",
      "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
      "https://www.youtube.com/watch?v=V-_O7nl0Ii0",
      "https://www.youtube.com/watch?v=60ItHLz5WEA",
      "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    ];

    for (let ch of channelData) {
      const channel = new Channel({
        channelName: ch.name,
        description: ch.description,
        owner: user._id,
        subscribers: Math.floor(Math.random() * 1000),
        videos: [],
      });
      await channel.save();

      // Create 5 videos per channel
      for (let i = 0; i < 5; i++) {
        const url = videoSamples[Math.floor(Math.random() * videoSamples.length)];
        const video = new Video({
          title: `${ch.name} Video ${i + 1}`,
          description: `A demo video from ${ch.name}`,
          thumbnailUrl: `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`,
          videoUrl: url,
          channelId: channel._id,
          category: ch.name,
          views: Math.floor(Math.random() * 5000),
        });
        await video.save();
        channel.videos.push(video._id);
      }

      await channel.save();

      // Demo user subscribes to this channel
      user.subscriptions.push(channel._id);
    }

    await user.save();

    console.log("🌱 Seeded multiple channels and videos successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
