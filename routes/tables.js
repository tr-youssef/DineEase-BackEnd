import express from "express";
import { getAvailableTablesByServerId } from "../controllers/tables.js";

const router = express.Router();

router.get("/availableTables/:serverId", getAvailableTablesByServerId);

export default router;
