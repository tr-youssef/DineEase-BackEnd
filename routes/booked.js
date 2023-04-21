import express from "express";
import { addBooked } from "../controllers/booked.js";

const router = express.Router();

router.post("/", addBooked);

export default router;
