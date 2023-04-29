import express from "express";
import { addOrder, updateStatusOrder, getOrders, getOrderById, getAlreadyOrderedTablesByServerId } from "../controllers/orders.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/getOrder/:id", getOrderById);
router.post("/", addOrder);
router.patch("/status/:id", updateStatusOrder);
router.get("/alreadyOrdered", getAlreadyOrderedTablesByServerId);

export default router;
