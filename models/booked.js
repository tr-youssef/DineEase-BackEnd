import mongoose from "mongoose";

const bookedsSchema = mongoose.Schema({
  booketAt: { type: String, required: true },
  tableId: { type: String, required: true },
  status: { type: String, required: true },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    require: [true, "Restaurant is required"],
  },
});

const Bookeds = mongoose.model("Bookeds", bookedsSchema);

export default Bookeds;
