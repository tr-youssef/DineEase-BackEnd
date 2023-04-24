import mongoose from "mongoose";

const tableSchema = mongoose.Schema({
    nameOfTable: { type: String, required: true },
    capacity: { type: String, required: true },
    status: { type: String, required: true },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      require: [true, "Restaurant is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: [true, "User is required"],
      },
  });

const Table = mongoose.model("Table", tableSchema);

export default Table;