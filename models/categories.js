import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    allowNull: false,
    required: [true, "Name is required"],
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: [true, "Restaurant is required"],
  },
});

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
