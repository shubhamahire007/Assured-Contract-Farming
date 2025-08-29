import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Farmer", "Buyer", "Admin"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    // Verification status
    isVerified: {
      type: Boolean,
      default: false
    },

    requests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request"
    }],
    
    verificationDetails: {
      documents: [{
        docType: { type: String }, // e.g., "Aadhaar", "Land Proof", "GST Cert"
        imageUrl: String, // Cloudinary link
        uploadedAt: { type: Date, default: Date.now },
      }],

      landSizeInAcres: Number,
      crops: [String], //  for farmers
      companyName: String, //  for buyers
      address: {
        type:String
      },
      contact: String,
    },

    offers:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Offer"
    }],
    requirements: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Requirement" 
    }],
    contracts: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Contract" 
    }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

