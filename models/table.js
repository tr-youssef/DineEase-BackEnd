import mongoose from "mongoose";

export const tablesSchema = new mongoose.Schema({
  nameOfTable: { type: String, required: [true, "Name of the table is required"] },
  capacity: { type: Number, required: [true, "Capacity is required"] },
  calculateTime: { type: Date, default: Date.now, required: false },
  status: {
    type: String,
    allowNull: false,
    enum: ["Available", "Filled"],
    required: [true, "Status amount is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    allowNull: false,
    required: [true, "UserId is required"],
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    allowNull: false,
    required: [true, "RestaurantId is required"],
  },
});

const Tables = mongoose.model("Tables", tablesSchema);

export default Tables;
