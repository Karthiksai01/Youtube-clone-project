import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subscribers: { type: Number, default: 0 },
    subscribedUsers: { type: [mongoose.Schema.Types.ObjectId], ref: "User" }, // Users subscribed to this channel
    description: { type: String },
    profilePicture: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Channel", ChannelSchema);
