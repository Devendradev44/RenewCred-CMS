import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  getPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
  getPageBySlug,
} from "../controllers/page.controller.js";

const router = express.Router();

// Public Route
router.get("/slug/:slug", getPageBySlug);

// Protected Admin Routes
router.get("/", protect, getPages);
router.get("/:id", protect, getPageById);
router.post("/", protect, createPage);
router.put("/:id", protect, updatePage);
router.delete("/:id", protect, deletePage);

export default router;