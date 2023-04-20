import mongoose from "mongoose";

const tableSchema = mongoose.Schema({
  nameOfTable: { type: Number, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, enum: ["available", "filled"], default: "available" },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    require: [true, "Restaurant is required"],
  },
});

const User = mongoose.model("Table", tableSchema);

export default Table;

