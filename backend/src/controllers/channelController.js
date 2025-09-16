import Channel from "../models/Channel.js";
import User from "../models/User.js";

// Create channel
export const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;
    const channel = new Channel({
      channelName,
      description,
      owner: req.user.id,
    });
    await channel.save();
    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all channels
export const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find().populate("owner", "username email");
    res.json(channels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one channel + videos
export const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("owner", "username email")
      .populate("videos"); // ✅ FIXED

    if (!channel) return res.status(404).json({ message: "Channel not found" });

    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Toggle subscribe/unsubscribe
export const toggleSubscribe = async (req, res) => {
  try {
    const channelId = req.params.id;
    const userId = req.user.id;

    const channel = await Channel.findById(channelId);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    const user = await User.findById(userId);

    const alreadySubscribed = user.subscriptions.includes(channelId);

    if (alreadySubscribed) {
      user.subscriptions.pull(channelId);
      channel.subscribers = Math.max(0, channel.subscribers - 1);
    } else {
      user.subscriptions.push(channelId);
      channel.subscribers += 1;
    }

    await user.save();
    await channel.save();

    res.json({ subscribed: !alreadySubscribed, total: channel.subscribers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get subscription feed
export const getSubscriptionsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "subscriptions",
      populate: { path: "videos" }, // ✅ FIXED
    });

    const videos = user.subscriptions.flatMap((ch) => ch.videos);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
