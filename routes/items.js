import express from "express";
import { addItem, getItems, deleteItem, updateItem, getItemById } from "../controllers/items.js";

const router = express.Router();

router.get("/getItems/:categoryId", getItems);
router.get("/:id", getItemById);
router.post("/", addItem);
router.delete("/:id", deleteItem);
router.patch("/:id", updateItem);

export default router;
