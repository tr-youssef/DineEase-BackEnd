import express from "express";
import { addTable, getTableById, getTables } from "../controllers/tables.js";
const router = express.Router();

router.get("/:id", getTableById);
router.post("/", addTable);
router.get("/", getTables);
// router.patch("/status/:id", updateStatusTable);

export default router;
