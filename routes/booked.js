import express from "express";
import { addBooked, getAvailableTablesByServerId, updateBooked } from "../controllers/booked.js";

const router = express.Router();

router.post("/", addBooked);
router.get("/availableTables", getAvailableTablesByServerId);
router.patch("/status/:id", updateBooked)


export default router;
