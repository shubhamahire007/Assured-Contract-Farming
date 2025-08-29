import mongoose from "mongoose";
import User from "./userModel.js";

const offerSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    crop: { type: String, required: true },
    quantity: { type: String, required: true }, // in tons, quintals, etc.
    expectedPrice: { type: String, required: true },
    expectedDuration: { type: String, required: true }, // e.g., "2 weeks", "1 month"
    status: {
      type: String,
      enum: ["Open", "Contracted", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

// After saving Offer → push into User.offers[]
offerSchema.post("save", async function (doc) {
    await User.findByIdAndUpdate(doc.farmerId, { $addToSet: { offers: doc._id}});
});

// After deleting Offer → remove from User.offers[]
offerSchema.post("findOneAndDelete", async function (doc) {
    await User.findByIdAndUpdate(doc.farmerId, { $pull: { offers: doc._id}});
});

export default mongoose.model("Offer", offerSchema);
