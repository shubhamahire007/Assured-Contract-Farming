import mongoose from "mongoose";

const contractSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    offerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
    },
    requirementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requirement",
    },

    crop: { type: String, required: true },
    quantity: { type: String, required: true }, // agreed quantity
    pricePerUnit: { type: String, required: true }, // final negotiated price

    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },

    status: {
      type: String,
      enum: ["Pending", "Active", "Completed", "Cancelled"],
      default: "Pending",
    },

    proofOfWork: [
      {
        imageUrl: String, // Cloudinary link
        description: String, // e.g., "Harvest complete"
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    confirmation: {
      farmerConfirmed: { type: Boolean, default: false },
      buyerConfirmed: { type: Boolean, default: false },
    },

    terms: { type: String }, // additional notes/terms agreed upon
  },
  { timestamps: true }
);


// After saving Contract → push into both users
contractSchema.post("save", async function (doc) {
  await User.findByIdAndUpdate(doc.farmerId, { $addToSet: { contracts: doc._id } });
  await User.findByIdAndUpdate(doc.buyerId, { $addToSet: { contracts: doc._id } });
});

// After deleting Contract → remove from both users
contractSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await User.findByIdAndUpdate(doc.farmerId, { $pull: { contracts: doc._id } });
    await User.findByIdAndUpdate(doc.buyerId, { $pull: { contracts: doc._id } });
  }
});

export default mongoose.model("Contract", contractSchema);
