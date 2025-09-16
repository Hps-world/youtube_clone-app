import express from "express";
import {
  listVideos,
  getVideo,
  createVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,   // ✅ now exists
} from "../controllers/videoController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", listVideos);
router.get("/:id", getVideo);
router.post("/", auth, createVideo);
router.delete("/:id", auth, deleteVideo);
router.post("/:id/like", auth, likeVideo);
router.post("/:id/dislike", auth, dislikeVideo); // ✅ fixed

export default router;
