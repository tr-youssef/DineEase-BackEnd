import express from "express";
import {
  addOrder,
  updateStatusOrder,
  getOrders,
  getOrderServedByServerId,
  getOrderReadyByServerId,
} from "../controllers/orders.js";

const router = express.Router();

router.get("/", getOrders);
//router.get("/getOrder/:id", getOrderById);
router.post("/", addOrder);
router.patch("/status/:id", updateStatusOrder);
router.get("/orderServed", getOrderServedByServerId);
router.get("/orderReady", getOrderReadyByServerId);

export default router;
