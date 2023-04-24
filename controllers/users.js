import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/users.js";

dotenv.config();

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User doesn't exists." });
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    if (!existingUser.active) return res.status(400).json({ message: "User inactive" });
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id, restaurantId: existingUser.restaurantId }, process.env.PRIVATE_KEY, { expiresIn: "12h" });

    res.status(200).json({ userId: existingUser._id, email: existingUser.email, firstName: existingUser.firstName, lastName: existingUser.lastName, role: existingUser.role, restaurantId: existingUser.restaurantId, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  try {
    const user = req.headers.authorization.split(" ")[1];
    if (user) {
      let decodedData = jwt.verify(user, process.env.PRIVATE_KEY);
      req.restaurantId = decodedData?.restaurantId;
    }
    const { email, password, confirmPassword, firstName, lastName, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists." });

    let hashedPassword;
    if (password && password === confirmPassword) {
      hashedPassword = await bcrypt.hash(password, 12);
    } else {
      hashedPassword = await bcrypt.hash(role, 12);
    }

    const result = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      active: true,
      restaurantId: req.restaurantId,
    });

    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
        restaurantId: result.restaurantId,
      },
      process.env.PRIVATE_KEY,
      {
        expiresIn: "12h",
      }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const user = await User.findOne({
      _id: id,
    });
    user ? res.status(200).json(user) : res.status(404).send({ message: `No user with id: ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const role = req.query.role;
    let users;
    if (role) {
      users = await User.find({
        restaurantId: req.restaurantId,
        role: role,
      }).sort({ active: "desc" });
    } else {
      users = await User.find({
        restaurantId: req.restaurantId,
      }).sort({ active: "desc" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const newEmployee = req.body;
    const oldEmployee = await User.updateOne(
      {
        _id: id,
      },
      {
        firstName: newEmployee.firstName,
        lastName: newEmployee.lastName,
        email: newEmployee.email,
        role: newEmployee.role,
      }
    );
    if (oldEmployee.matchedCount > 0) {
      const employeeUpdated = await User.findOne({
        _id: id,
      });
      res.status(201).json(employeeUpdated);
    } else {
      res.status(404).json({ message: `No employee with id : ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const statusEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const employeeToUpdate = await User.findOne({ _id: id });
    if (!employeeToUpdate) {
      return res.status(404).json({ message: `No employee with id : ${id}` });
    }
    const newStatus = req.body.active ? false : true;
    const updatedEmployee = await User.findByIdAndUpdate(id, { active: newStatus }, { new: true });
    res.status(201).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
