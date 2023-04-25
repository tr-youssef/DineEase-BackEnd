import express from "express";
import { addTable, getTableById, getTables, getAvailableTablesByServerId, getAlreadyOrderedTablesByServerId } from "../controllers/table.js";
const router = express.Router();

router.get("/getTable/:id", getTableById);
router.post("/", addTable);
router.get("/", getTables);
router.get("/availableTables", getAvailableTablesByServerId);
router.get("/alreadyOrdered", getAlreadyOrderedTablesByServerId);

export default router;
