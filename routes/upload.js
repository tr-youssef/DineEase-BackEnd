import express from "express";
import { uploadItem } from "../controllers/upload.js";

const router = express.Router();

router.post("/item", uploadItem);

export default router;
