import jwt from "jsonwebtoken";
import Table from "../models/Tables.js";

export const getTableById = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const table = await Tables.findOne({
      _id: id,
    });
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
    console.log('tableCreated', tableCreated)
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
    console.log('token', token)
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    console.log('req.restaurantId', req.restaurantId)
    const tables = await Table.find({ restaurantId: req.restaurantId });
    console.log('tables', tables)
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


