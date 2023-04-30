import jwt from "jsonwebtoken";
import Booked from "../models/booked.js";

export const addBooked = async (req, res) => {
  try {
    const newBooked = req.body;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    let bookedCreated = await Booked.create({
      bookedAt: Date.now(),
      tableId: newBooked.tableId,
      status: "NewClient",
    });
    res.status(201).json(bookedCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAvailableTablesByServerId = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    let tables = await Booked.find({ status: "NewClient" })
      .select({ _id: 1 })
      .populate({ path: "tableId", select: { restaurantId: 1, nameOfTable: 1, capacity: 1 }, populate: { path: "userId", select: { userId: 1 } } });
    const filteredTables = tables.filter((table) => table.tableId.restaurantId.toString() === req.restaurantId && table.tableId.userId._id.toString() === req.userId);
    const finishTables = filteredTables.map((filteredtable) => ({ _id: filteredtable._id, nameOfTable: filteredtable.tableId.nameOfTable, capacity: filteredtable.tableId.capacity }));

    if (!finishTables) {
      res.status(404).send({ message: `No table found.` });
    } else {
      res.status(200).json(finishTables);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBooked = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    };

    const newBooked = req.body;
    const leavedAt = Date.now();
    const oldBooked = await Booked.updateOne(
      {
        _id: id,
      },
      {
        bookedAt: newBooked.bookedAt,
        leavedAt: leavedAt, 
        tableId: req.tableId,
        status: newBooked.status,
      }
    );
    if (oldBooked.matchedCount > 0) {
      const BookedUpdated = await Booked.findOne({
        _id: id,
      });
      res.status(201).json(BookedUpdated);
    } else {
      res.status(404).json({ message: `No Booked with id : ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
