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
