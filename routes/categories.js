import express from "express";
import { addCategory, getCategories, deleteCategory, updateCategory, getCategoryById } from "../controllers/categories.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", addCategory);
router.delete("/:id", deleteCategory);
router.patch("/:id", updateCategory);

export default router;
