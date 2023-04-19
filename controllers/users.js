import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/users.js";

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
  const newEmployee = new UserModel({
    fullName: req.body.fullName,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    let existingEmployee = await UserModel.findOne({
      email: newEmployee.email,
    });

    if (existingEmployee) {
      return res.status(400).json({
        msg: 'User Already Exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    newEmployee.password = await bcrypt.hash(newEmployee.password.toString(), salt);
    await newEmployee.save();

    const payload = {
      user: {
        id: newEmployee.id,
      },
    };

    jwt.sign(
      payload,
      'randomString',
      {
        expiresIn: '12h',
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(403).json({
      error: error.message,
    });
  }
};



