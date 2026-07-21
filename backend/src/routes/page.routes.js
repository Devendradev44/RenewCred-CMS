import express from "express";
import {
  getPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
  getPageBySlug,
} from "../controllers/page.controller.js";

const router = express.Router();

router.get("/", getPages);
router.get("/slug/:slug", getPageBySlug);
router.get("/:id", getPageById);
router.post("/", createPage);
router.put("/:id", updatePage);
router.delete("/:id", deletePage);

export default router;