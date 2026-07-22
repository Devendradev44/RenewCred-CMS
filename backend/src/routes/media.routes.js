import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js";
import {
  uploadMedia,
  getMedia,
} from "../controllers/media.controller.js";

const router = express.Router();

// Protected Routes
router.get("/", protect, getMedia);

router.post(
  "/",
  protect,
  upload.single("image"),
  uploadMedia
);

export default router;