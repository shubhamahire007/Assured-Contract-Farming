import mongoose from "mongoose";
import User from "./userModel.js";

const requirementSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    crop: { type: String, required: true },
    quantity: { type: String, required: true },
    expectedPrice: String,
    neededBy: Date,
    status: {
      type: String,
      enum: ["Open", "Fulfilled", "Closed"],
      default: "Open",
    },
    // isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// After saving Requirement → push into User.requirements[]
requirementSchema.post("save", async function(doc) {
    await User.findByIdAndUpdate(doc.buyerId, {$addToSet: {requirements: doc._id}})
})

// After deleting Requirement → remove from User.requirements[]
requirementSchema.post("findOneAndDelete", async function(doc) {
    await User.findByIdAndUpdate(doc.buyerId, {$pull: {requirements: doc._id}})
});

export default mongoose.model("Requirement", requirementSchema);
