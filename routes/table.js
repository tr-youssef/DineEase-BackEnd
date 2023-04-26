import express from "express";
import { addTable, getTableById, getTables, getAlreadyOrderedTablesByServerId, getAvailableTables, updateTable } from "../controllers/table.js";
const router = express.Router();

router.get("/getTable/:id", getTableById);
router.post("/", addTable);
router.get("/", getTables);
router.patch("/status/:id", updateTable)
router.get("/alreadyOrdered", getAlreadyOrderedTablesByServerId);
router.get("/availableTables", getAvailableTables)

export default router;
