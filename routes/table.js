import express from "express";
import { addTable, getTableById, getTables, getAlreadyOrderedTablesByServerId } from "../controllers/table.js";
const router = express.Router();

router.get("/getTable/:id", getTableById);
router.post("/", addTable);
router.get("/", getTables);
router.get("/alreadyOrdered", getAlreadyOrderedTablesByServerId);

export default router;
