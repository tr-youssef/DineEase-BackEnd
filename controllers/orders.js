import jwt from "jsonwebtoken";
import Orders from "../models/orders.js";
import Booked from "../models/booked.js";

export const getOrders = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const orders = await Orders.find({ status: "New" }).populate({
      path: "bookedId",
      populate: { path: "tableId", populate: { path: "restaurantId" } },
    });
    const filteredOrders = orders.filter(
      (order) =>
        order.bookedId.tableId.restaurantId?._id.toString() === req.restaurantId
    );
    res.status(200).json(filteredOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendOrders = async (req, res) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    // if (token) {
    //   let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
    //   req.userId = decodedData?.id;
    //   req.restaurantId = decodedData?.restaurantId;
    // }
    const orders = await Orders.find({ status: "New" }).populate({
      path: "bookedId",
      populate: { path: "tableId", populate: { path: "restaurantId" } },
    });
    // const filteredOrders = orders.filter((order) => order.bookedId.tableId.restaurantId?._id.toString() === req.restaurantId);
    return orders;
  } catch (error) {
    return error.message;
  }
};

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
    order
      ? res.status(200).json(order)
      : res.status(404).send({ message: `No order with id: ${id}` });
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
      bookedId: newOrder.bookedId.id,
      userId: req.userId,
      items: newOrder.items,
      subTotalAmount: newOrder.subTotalAmount,
      tax: newOrder.tax,
      totalAmount: newOrder.totalAmount,
      status: newOrder.status,
    });

    await Booked.findOneAndUpdate(
      { _id: newOrder.bookedId?.id },
      { status: "AlreadyOrdered" }
    );
    res.status(201).json(orderCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAlreadyServedTablesByServerId = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    let tables = await Orders.find({ status: "Served" })
      .select({ _id: 1 })
      .populate({ path: "userId", select: { _id: 1 } })
      .populate({ path: "bookedId", select: { _id: 1 }, populate: { path: "tableId", select: { nameOfTable: 1, capacity: 1, restaurantId: 1 } } });
    const filteredTables = tables.filter((table) => table.bookedId.tableId.restaurantId.toString() === req.restaurantId && table.userId._id.toString() === req.userId);
    const finishTables = filteredTables.map((filteredtable) => ({
      _id: filteredtable._id,
      bookedId: filteredtable.bookedId._id,
      tableId: filteredtable.bookedId.tableId._id, 
      nameOfTable: filteredtable.bookedId.tableId.nameOfTable,
      capacity: filteredtable.bookedId.tableId.capacity
    }));
    
    if (!finishTables) {
      res.status(404).send({ message: `No table found.` });
    } else {
      res.status(200).json(finishTables);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

export const getOrderReadyByServerId = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    let tables = await Orders.find({ status: "New" })
      .select({ _id: 1 })
      .populate({ path: "userId", select: { _id: 1 } })
      .populate({ path: "bookedId", select: { _id: 1 }, populate: { path: "tableId", select: { nameOfTable: 1, capacity: 1, restaurantId: 1 } } });
    const filteredTables = tables.filter((table) => table.bookedId.tableId.restaurantId.toString() === req.restaurantId && table.userId._id.toString() === req.userId);
    const finishTables = filteredTables.map((filteredtable) => ({
      _id: filteredtable._id,
      bookedId: filteredtable.bookedId._id,
      tableId: filteredtable.bookedId.tableId._id, 
      nameOfTable: filteredtable.bookedId.tableId.nameOfTable,
      capacity: filteredtable.bookedId.tableId.capacity
    }));
    
    if (!finishTables) {
      res.status(404).send({ message: `No table found.` });
    } else {
      res.status(200).json(finishTables);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderReadyByServerId = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    let tables = await Orders.find({ status: "Ready" })
      .select({ _id: 1 })
      .populate({ path: "userId", select: { _id: 1 } })
      .populate({
        path: "bookedId",
        select: { _id: 1, status: 1 },
        populate: {
          path: "tableId",
          select: { nameOfTable: 1, capacity: 1, restaurantId: 1 },
        },
      });
   

    const filteredTables = tables.filter(
      (table) =>
        table.bookedId?.tableId?.restaurantId?.toString() ===
          req.restaurantId &&
        table.userId?._id?.toString() === req.userId &&
        table.bookedId?.status === "AlreadyOrdered"
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
