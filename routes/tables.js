import express from "express";
import { addTable, getTableById, getTables,  getAvailableTables, updateTableStauts }
 from "../controllers/Tables.js";
const router = express.Router();

router.get("/:id", getTableById);
router.post("/", addTable);
router.get("/", getTables);
router.get("/available", getAvailableTables);
router.patch("/status/:id", updateTableStauts);

export default router;

