import express from "express";
import { signin, signup, addEmployee } from "../controllers/users.js";


const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/", addEmployee);

export default router;
