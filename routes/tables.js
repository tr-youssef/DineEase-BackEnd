import express from "express";
import { addTable, getTableById, getTables, getAvailableTablesByServerId, getAlreadyOrderedTablesByServerId } from "../controllers/tables.js";
const router = express.Router();

router.get("/:id", getTableById);
router.post("/", addTable);
router.get("/", getTables);
router.get("/availableTables/:id", getAvailableTablesByServerId);
router.get("/alreadyordered/:id", getAlreadyOrderedTablesByServerId);
// router.patch("/status/:id", updateStatusTable);

export default router;
