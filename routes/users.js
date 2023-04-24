import express from "express";
import { signin, signup,getUsers, updateEmployee, getUsersById, statusEmployee } from "../controllers/users.js";


const usersRouter = express.Router();

usersRouter.post("/signin", signin);
usersRouter.post("/signup", signup);
usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUsersById);
usersRouter.patch("/:id", updateEmployee)
usersRouter.patch("/status/:id", statusEmployee);

export default usersRouter;
