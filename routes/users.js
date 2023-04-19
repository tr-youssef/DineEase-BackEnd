import express from "express";
import { signin, signup } from "../controllers/users.js";


const usersRouter = express.Router();

usersRouter.post("/signin", signin);
usersRouter.post("/", signup);

export default usersRouter;
