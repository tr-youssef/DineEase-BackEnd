import express from "express";
import { addTable, getTableById }
 from "../controllers/Tables.js";
const router = express.Router();

router.get("/:id", getTableById);
router.post("/", addTable);
// router.patch("/status/:id", updateStatusTable);

export default router;

