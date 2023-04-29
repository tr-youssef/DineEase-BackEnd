import express from "express";
import {
  addTable,
  getTableById,
  getTables,
  getOrderServedByServerId,
  getAvailableTables,
  updateTable,
  getFilledTables,
  deleteTable,
} from "../controllers/table.js";
const router = express.Router();

router.get("/getTable/:id", getTableById);
router.post("/", addTable);
router.get("/", getTables);
router.patch("/status/:id", updateTable);
router.delete("/:id", deleteTable);
router.get("/alreadyOrdered", getOrderServedByServerId);
router.get("/availableTables", getAvailableTables);
router.get("/filledTables", getFilledTables);

export default router;
