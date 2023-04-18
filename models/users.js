import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, require: true },
  active: { type: Boolean, require: true },
  password: { type: String, required: true },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    require: [true, "Restaurant is required"]
  },

});

const User = mongoose.model("User", userSchema);

export default User;
