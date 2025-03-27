import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    subscribers: { type: Number, default: 0 },
    subscribedUsers: { type: [String] }, // Stores subscribed channels
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
