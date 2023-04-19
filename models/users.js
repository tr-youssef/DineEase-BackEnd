import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: [true, "FirstName is required"] },
  lastName: { type: String, required: [true, "LastName is required"] },
  role: { type: String, required: [true, "Role is required"]},
  email: { type: String, required: [true, "Email is required"] },
  password: { type: String, required: [true, "Password is required"] },
  // restaurantId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Restaurant",
  //   required: [true, "RestaurantId is required"],
  // },
});

export const UserModel = mongoose.model('User', userSchema);

