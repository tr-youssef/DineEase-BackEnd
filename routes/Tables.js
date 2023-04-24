import express from "express";
import { addTable, deleteTable, getTableById, getTables, updateTable }
 from "../controllers/Tables.js";
const router = express.Router();

router.get("/:id", getTableById);
router.post("/", addTable);
router.get("/", getTables);
router.patch("/:id", updateTable);
router.delete("/:id", deleteTable);

export default router;

