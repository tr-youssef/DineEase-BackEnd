import jwt from "jsonwebtoken";
import Restaurants from "../models/restaurants.js";

export const addRestaurant = async (req, res) => {
  try {
    const newRestaurant = req.body;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userId = decodedData?.id;
      req.restaurantId = decodedData?.restaurantId;
    }
    let restaurantCreated = await Restaurants.create({
      nameOfTable: newRestaurant.restaurant,
    });
    res.status(201).json(restaurantCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
