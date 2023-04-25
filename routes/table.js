import express from "express";
import { addTable, getTableById, getTables, getAvailableTablesByServerId, getAlreadyOrderedTablesByServerId } from "../controllers/table.js";
const router = express.Router();

router.get("/:id", getTableById);
router.post("/", addTable);
router.get("/", getTables);
router.get("/availableTables/", getAvailableTablesByServerId);
router.get("/alreadyordered/", getAlreadyOrderedTablesByServerId);
// router.patch("/status/:id", updateStatusTable);

export default router;
