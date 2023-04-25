import jwt from "jsonwebtoken";
import Table from "../models/table.js";

export const getTableById = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const table = await Table.findOne({
      _id: id,
    }).populate({ path: "userId" });
    table ? res.status(200).json(table) : res.status(404).send({ message: `No table with id: ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addTable = async (req, res) => {
  try {
    const newTable = req.body;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    let tableCreated = await Table.create({
      capacity: newTable.capacity,
      nameOfTable: newTable.nameOfTable,
      status: newTable.status,
      restaurantId: req.restaurantId,
      userId: newTable.userId,
    });
    res.status(201).json(tableCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const deleteItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const token = req.headers.authorization.split(" ")[1];
//     if (token) {
//       let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
//       req.userId = decodedData?.id;
//       req.restaurantId = decodedData?.restaurantId;
//     }
//     const itemDeleted = await Items.deleteOne({
//       _id: id,
//     });
//     itemDeleted.deletedCount > 0 ? res.status(200).json("Category deleted") : res.status(400).json("Category doesn't exist");
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getTables = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const tables = await Table.find({ restaurantId: req.restaurantId });
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAlreadyOrderedTablesByServerId = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    let tables = await Table.find({ status: "Filled" }).populate({ path: "userId" }).populate({ path: "restaurantId" });
    const filteredTables = tables.filter((table) => table.restaurantId._id.toString() === req.restaurantId && table.userId._id.toString() === req.userId);
    if (!filteredTables) {
      res.status(404).send({ message: `No table found.` });
    } else {
      res.status(200).json(filteredTables);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
