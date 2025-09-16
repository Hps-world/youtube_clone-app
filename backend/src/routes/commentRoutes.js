import express from "express";
import {
  addComment,
  getComments,
  editComment,
  deleteComment,   // ✅ now exists
} from "../controllers/commentController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:videoId", auth, addComment);
router.get("/:videoId", getComments);
router.put("/:id", auth, editComment);
router.delete("/:id", auth, deleteComment); // ✅ fixed

export default router;
