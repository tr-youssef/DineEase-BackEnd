import express from "express";
import { addBooked, getAvailableTablesByServerId, updateBookedStatus, updateBooked } from "../controllers/booked.js";

const router = express.Router();

router.post("/", addBooked);
router.get("/availableTables", getAvailableTablesByServerId);
router.patch("/status/:id", updateBooked);
router.patch("/bookedStatus/:id", updateBookedStatus);


export default router;
