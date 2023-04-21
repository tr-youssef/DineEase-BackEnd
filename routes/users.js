import express from "express";
import { signin, signup,getUsers, updateEmployee, getUsersById, deleteEmployee } from "../controllers/users.js";


const usersRouter = express.Router();

usersRouter.post("/signin", signin);
usersRouter.post("/signup", signup);
usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUsersById);
usersRouter.patch("/:id", updateEmployee)
usersRouter.delete("/:id", deleteEmployee);

export default usersRouter;
