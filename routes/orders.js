import express from "express";
import { addOrder, getOrderById, updateStatusOrder, getOrders } from "../controllers/orders.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", addOrder);
router.patch("/status/:id", updateStatusOrder);

export default router;
