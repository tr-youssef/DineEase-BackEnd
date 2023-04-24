import jwt from "jsonwebtoken";
import Tables from "../models/table.js";
import Bookeds from "../models/booked.js";

export const getAvailableTablesByServerId = async (req, res) => {
  try {
    // TODO: Filter by server id later.
    const { serverId } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
      }
      let tables = await Tables.find({ status: "Filled" });
      const filteredTables = tables.filter(
        (table) =>
          table.restaurantId.toString() === req.restaurantId &&
          table.userId.toString() === req.userId
      );
    if (!filteredTables) {
      res.status(404).send({ message: `No table found.` });
    } else {
      res.status(200).json(filteredTables);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
