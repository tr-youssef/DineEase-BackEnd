import express from "express";
import { addBooked, getAvailableTablesByServerId, updateStatusNewClientToAlreadyOrdered } from "../controllers/booked.js";

const router = express.Router();

router.post("/", addBooked);
router.get("/availableTables", getAvailableTablesByServerId);
router.patch("/:id", updateStatusNewClientToAlreadyOrdered);
export default router;
