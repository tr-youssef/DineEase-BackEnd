import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/users.js";

dotenv.config();

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User doesn't exists." });
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id, restaurantId: existingUser.restaurantId }, process.env.PRIVATE_KEY, { expiresIn: "12h" });
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "SOmething went wrong." });
  }
}


export const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, restaurantId } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      firstName,
      lastName,
      role,
      email,
      password: hashedPassword,
      restaurantId
    });

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};


