import mongoose from "mongoose";

const tableSchema = mongoose.Schema({
  nameOfTable: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, enum: ["available", "filled"], default: "available" },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    require: [true, "Restaurant is required"],
  },
});

const Tables = mongoose.model("Tables", tableSchema);

export default Tables;
