import jwt from "jsonwebtoken";
import Tables from "../models/tables.js";
import mongoose from "mongoose";

export const addTables = async (req, res) => {
  try {
    const newTable = req.body;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    let tableCreated = await Tables.create({
      nameOfTable: newTable.nameOfTable,
      capacity: newTable.capacity,
      status: "Available",
      userId: newTable.userId,
      restaurantId: req.restaurantId,
    });
    res.status(201).json(tableCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTables = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    let tables = await Tables.find({ status: "Filled" });
    const filteredTables = tables.filter((table) => table.restaurantId.toString() === req.restaurantId && table.userId.toString() === req.userId);

    res.status(201).json(filteredTables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
