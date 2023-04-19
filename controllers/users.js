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
    if (!existingUser.active) return res.status(400).json({ message: "User inactive" });
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id, restaurantId: existingUser.restaurantId }, process.env.PRIVATE_KEY, { expiresIn: "12h" });
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "SOmething went wrong." });
  }
}


export const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword, firstName, lastName, role, restaurantId } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword) return res.status(400).json({ message: "passwords don't match." });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      active: true,
      restaurantId,
    });
    const token = jwt.sign({ email: result.email, id: result._id, restaurantId: result.restaurantId }, process.env.PRIVATE_KEY, {
      expiresIn: "12h",
    });
    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.HASHCODE);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const users = await Users.find({
      restaurantId: req.restaurantId,
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signup2 = async (req, res) => {
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
    if (newEmployee.password) {
      newEmployee.password = await bcrypt.hash(newEmployee.password.toString(), salt);
    }
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


