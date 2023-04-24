import express from "express";
import { addTable, getTableById, getTables, deleteTable, getAvailableTablesByServerId, getAlreadyOrderedTablesByServerId } from "../controllers/Tables.js";
const router = express.Router();

router.get("/:id", getTableById);
router.post("/", addTable);
router.get("/", getTables);
router.delete("/:id", deleteTable);
router.get("/availabletables/:id", getAvailableTablesByServerId);
router.get("/alreadyorderedtables/:id", getAlreadyOrderedTablesByServerId);
// router.patch("/status/:id", updateStatusTable);

export default router;
