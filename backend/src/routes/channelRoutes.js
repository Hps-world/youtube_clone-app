import express from "express";
import {
  createChannel,
  getChannels,
  getChannel,
  toggleSubscribe,
  getSubscriptionsFeed,
} from "../controllers/channelController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createChannel);
router.get("/", getChannels);
router.get("/:id", getChannel);
router.post("/:id/subscribe", auth, toggleSubscribe);
router.get("/subscriptions/feed", auth, getSubscriptionsFeed);

export default router;
