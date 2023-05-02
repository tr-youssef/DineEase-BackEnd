import mongoose from "mongoose";

export const ordersSchema = new mongoose.Schema({
  bookedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booked",
    required: [true, "Booked is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  items: {
    type: [mongoose.Schema.Types.Mixed],
    allowNull: false,
    required: [true, "Items is required"],
  },
  subTotalAmount: {
    type: Number,
    allowNull: false,
    required: [true, "Sub total amount is required"],
  },
  tax: {
    type: Number,
    allowNull: false,
    required: [true, "Tax is required"],
  },
  totalAmount: {
    type: Number,
    allowNull: false,
    required: [true, "Total amount is required"],
  },
  status: {
    type: String,
    allowNull: false,
    enum: ["New", "Ready", "Empty", "Served"],
    required: [true, "Sub total amount is required"],
  },
});

const Orders = mongoose.model("Orders", ordersSchema);

export default Orders;
