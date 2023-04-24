import express from "express";
import { addTable, getTableById, getTables, updateTable }
 from "../controllers/Tables.js";
const router = express.Router();

router.get("/:id", getTableById);
router.post("/", addTable);
router.get("/", getTables);
router.patch("/:id", updateTable);

export default router;

