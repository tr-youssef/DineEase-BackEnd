import express from "express";
import { addOrder, updateStatusOrder, getOrders, getAlreadyServedTablesByServerId, getOrderReadyByServerId, getOrderById, getAlreadyOrderedTablesByServerId } from "../controllers/orders.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/getOrder/:id", getOrderById);
router.post("/", addOrder);
router.patch("/status/:id", updateStatusOrder);
router.get("/alreadyOrdered", getAlreadyOrderedTablesByServerId);
router.get("/alreadyServed", getAlreadyServedTablesByServerId);
router.get("/orderReady/", getOrderReadyByServerId)

export default router;
