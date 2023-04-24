import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    allowNull: false,
    required: [true, "Name is required"],
  },
});

const Restaurants = mongoose.model("Restaurants", restaurantSchema);

export default Restaurants;
