import mongoose, { mongo } from "mongoose";
import User from "./userModel.js";
import Requirement from "./requirementModel.js";
import Offer from "./offerModel.js";

const requestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    requirementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Requirement
    },
    offerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Offer
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Contracted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// After saving Request → push into both users' requests arrays
requestSchema.post("save", async function (doc) {
  await User.findByIdAndUpdate(doc.senderId, {
    $addToSet: { requests: doc._id },
  });
  await User.findByIdAndUpdate(doc.receiverId, {
    $addToSet: { requests: doc._id },
  });
});

// After deleting Request → remove from both users' requests arrays
requestSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await User.findByIdAndUpdate(doc.senderId, { $pull: { requests: doc._id } });
    await User.findByIdAndUpdate(doc.receiverId, { $pull: { requests: doc._id } });
  }
});

export default mongoose.model("Request", requestSchema);
