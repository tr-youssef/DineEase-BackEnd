import mongoose from "mongoose";

export const bookedSchema = new mongoose.Schema({
  bookedAt: { type: Date, default: Date.now, required: [true, "BookedAt is required"] },
  leavedAt: { type: Date, default: Date.now, required: false },
  calculateTime: { type: Date, default: Date.now, required: false },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tables",
    allowNull: false,
    required: [true, "TableId is required"],
  },
  status: {
    type: String,
    allowNull: false,
    enum: ["NewClient", "AlreadyOrdered", "Payed"],
    required: [true, "Status amount is required"],
  },
});

const Booked = mongoose.model("Booked", bookedSchema);

export default Booked;
