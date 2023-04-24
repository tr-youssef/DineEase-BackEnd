import jwt from "jsonwebtoken";
import Tables from "../models/table.js";
import Bookeds from "../models/booked.js";

export const getAvailableTablesByServerId = async (req, res) => {
  try {
    // TODO: Filter by server id later.
    const { serverId } = req.params;
    // const token = req.headers.authorization.split(" ")[1];
    // if (token) {
    //   let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
    //   req.userId = decodedData?.id;
    //   req.restaurantId = decodedData?.restaurantId;
    // }
    const tables = await Tables.find({ status: "Available" });
    if (!tables) {
      res.status(404).send({ message: `No table found.` });
    } else {
      const tableIds = tables.map((a) =>
        a._id.toString().replace(/new ObjectId\(|\)/g, "")
      );
      const bookeds = await Bookeds.find({
        tableId: { $in: tableIds },
      });
      const tablesWithBookingId = tables.map((table) => {
        return {
          nameOfTable: table.nameOfTable,
          capacity: table.capacity,
          bookingId: bookeds.find(
            (booking) =>
              booking.tableId ===
              table._id.toString().replace(/new ObjectId\(|\)/g, "")
          )?._id,
        };
      });

      res.status(200).json(tablesWithBookingId);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
