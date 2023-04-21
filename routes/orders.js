import express from "express";
import { addOrder, getOrderById, updateStatusOrder } from "../controllers/orders.js";

const router = express.Router();

// router.get("/getItems/:categoryId", getItems);
router.get("/:id", getOrderById);
router.post("/", addOrder);
// router.delete("/:id", deleteItem);
router.patch("/:id", updateStatusOrder);

export default router;
