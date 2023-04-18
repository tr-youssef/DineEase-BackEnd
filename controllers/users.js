import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/users.js";

dotenv.config();

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exists." });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    if (!existingUser.active)
      return res.status(400).json({ message: "User is Inactive" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.PRIVATE_KEY,
      { expiresIn: "12h" }
    );
    res.status(200).json({ existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "SOmething went wrong." });
  }
};
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "passwords don't match." });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.PRIVATE_KEY,
      {
        expiresIn: "12h",
      }
    );
    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};
