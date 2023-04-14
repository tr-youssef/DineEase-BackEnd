import jwt from "jsonwebtoken";
import Categories from "../models/categories.js";

export const getCategories = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
    req.restaurantId = decodedData?.restaurantId;
  }
  try {
    const categories = await Categories.find({
      restaurantId: req.restaurantId,
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
    req.restaurantId = decodedData?.restaurantId;
  }
  try {
    const category = await Categories.findOne({
      _id: id,
      restaurantId: req.restaurantId,
    });
    category ? res.status(200).json(category) : res.status(404).send({ message: `No category with id: ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addCategory = async (req, res) => {
  const newCategory = req.body;
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
    req.restaurantId = decodedData?.restaurantId;
  }
  try {
    let categoryCreated = await Categories.create({
      name: newCategory.name,
      restaurantId: req.restaurantId,
    });
    res.status(201).json(categoryCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
    req.restaurantId = decodedData?.restaurantId;
  }
  try {
    const categoryDeleted = await Categories.deleteOne({
      _id: id,
      restaurantId: req.restaurantId,
    });
    categoryDeleted.deletedCount > 0 ? res.status(200).json("Category deleted") : res.status(400).json("Category doesn't exist");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
    req.restaurantId = decodedData?.restaurantId;
  }
  const newCategory = req.body;
  try {
    const oldCategory = await Categories.updateOne(
      {
        _id: id,
        restaurantId: req.restaurantId,
      },
      {
        name: newCategory.name,
      }
    );
    if (oldCategory.modifiedCount > 0) {
      const categoryUpdated = await Categories.findOne({
        _id: id,
      });
      res.status(201).json(categoryUpdated);
    } else {
      res.status(404).json({ message: `No Category with id : ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
