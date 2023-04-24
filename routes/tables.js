import express from "express";
import { addTables, getTables } from "../controllers/tables.js";

const router = express.Router();

router.post("/", addTables);
router.get("/", getTables);

export default router;
