import express from "express";
import { addRestaurant } from "../controllers/restaurants.js";

const router = express.Router();

router.post("/", addRestaurant);

export default router;
