import jwt from "jsonwebtoken";
import Orders from "../models/orders.js";

// export const getItems = async (req, res) => {
//   try {
//     const { categoryId } = req.params;
//     const token = req.headers.authorization.split(" ")[1];
//     if (token) {
//       let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
//       req.userId = decodedData?.id;
//       req.restaurantId = decodedData?.restaurantId;
//     }
//     const items = await Items.find({
//       categoryId: categoryId,
//     });
//     res.status(200).json(items);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const order = await Orders.findOne({
      _id: id,
    });
    order ? res.status(200).json(order) : res.status(404).send({ message: `No order with id: ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addOrder = async (req, res) => {
  try {
    const newOrder = req.body;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    let orderCreated = await Orders.create({
      bookedId: newOrder.tableId,
      userId: newOrder.userId,
      items: newOrder.items,
      subTotalAmount: newOrder.subTotalAmount,
      tax: newOrder.tax,
      totalAmount: newOrder.totalAmount,
      status: newOrder.status,
    });
    res.status(201).json(orderCreated);
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

export const updateStatusOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const newStatus = req.body.status;
    const updateOrder = await Orders.findOneAndUpdate(
      {
        _id: id,
      },
      { status: newStatus }
    );
    if (updateOrder) {
      const newOrder = await Orders.findOne({
        _id: id,
      });
      res.status(201).json(newOrder);
    } else {
      res.status(404).json({ message: `No order with id : ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
