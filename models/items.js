import mongoose from "mongoose";

export const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    allowNull: false,
    required: [true, "Name is required"],
  },
  price: {
    type: Number,
    allowNull: false,
    required: [true, "Price is required"],
  },
  picture: {
    type: String,
    allowNull: false,
    required: [true, "Picture is required"],
  },
  description: {
    type: String,
    allowNull: false,
    required: [true, "Description is required"],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: [true, "Categry is required"],
  },
});

const Items = mongoose.model("Items", itemsSchema);

export default Items;
