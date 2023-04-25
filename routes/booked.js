import express from "express";
import { addBooked, getAvailableTablesByServerId } from "../controllers/booked.js";

const router = express.Router();

router.post("/", addBooked);
router.get("/availableTables", getAvailableTablesByServerId);

export default router;
