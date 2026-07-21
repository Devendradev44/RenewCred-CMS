import express from "express";
import upload from "../middleware/upload.js";
import {
  uploadMedia,
  getMedia,
} from "../controllers/media.controller.js";

const router = express.Router();

router.get("/", getMedia);

router.post("/", upload.single("image"), uploadMedia);

export default router;