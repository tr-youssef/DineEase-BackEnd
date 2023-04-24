import express from "express";
import { addTable, getTables, updateTable }
 from "../controllers/Tables.js";
const router = express.Router();

router.post("/", addTable);
router.get("/", getTables);
router.patch("/:id", updateTable);

export default router;

