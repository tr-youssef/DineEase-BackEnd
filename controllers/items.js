import jwt from "jsonwebtoken";
import Items from "../models/items.js";

export const getItems = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.HASHCODE);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const items = await Items.find({
      categoryId: categoryId,
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.HASHCODE);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const item = await Items.findOne({
      _id: id,
    });
    item ? res.status(200).json(item) : res.status(404).send({ message: `No item with id: ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addItem = async (req, res) => {
  try {
    const newItem = req.body;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.HASHCODE);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    let itemCreated = await Items.create({
      name: newItem.name,
      price: newItem.price,
      picture: newItem.picture,
      description: newItem.description,
      categoryId: newItem.categoryId,
    });
    res.status(201).json(itemCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.HASHCODE);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const itemDeleted = await Items.deleteOne({
      _id: id,
    });
    itemDeleted.deletedCount > 0 ? res.status(200).json("Category deleted") : res.status(400).json("Category doesn't exist");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.HASHCODE);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    const newItem = req.body;
    const oldItem = await Items.updateOne(
      {
        _id: id,
      },
      {
        name: newItem.name,
        price: newItem.price,
        picture: newItem.picture,
        description: newItem.description,
      }
    );
    if (oldItem.matchedCount > 0) {
      const itemUpdated = await Items.findOne({
        _id: id,
      });
      res.status(201).json(itemUpdated);
    } else {
      res.status(404).json({ message: `No Item with id : ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
