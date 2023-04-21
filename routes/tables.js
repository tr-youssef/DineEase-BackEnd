import express from "express";
import { addTables } from "../controllers/tables.js";

const router = express.Router();

router.post("/", addTables);

export default router;
