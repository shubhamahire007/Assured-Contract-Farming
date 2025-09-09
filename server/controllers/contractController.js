import Contract from "../models/contractModel.js";
import Request from "../models/requestModel.js";
import Offer from "../models/offerModel.js";
import Requirement from "../models/requirementModel.js";

// @desc    Get the pre-filled data needed to create a contract from a request
// @route   GET /api/contracts/data-for-creation/:requestId
export const getContractData = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId)
      .populate("senderId", "name email isVerified role")
      .populate("receiverId", "name email isVerified role");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    let item;
    if (request.offerId) {
      item = await Offer.findById(request.offerId);
    } else if (request.requirementId) {
      item = await Requirement.findById(request.requirementId);
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Original offer or requirement not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        request,
        item,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

//get all contracts
export const getContracts = async (req, res) => {
  try {
    const contracts = await Contract.find()
                                      .populate("farmerId", "name email")
                                      .populate("buyerId", "name email");
    if (!contracts) {
      return res.status(404).json({
        success: false,
        message: "Contract not found",
      });
    }
    res.status(200).json({
      success: true,
      data: contracts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// get contracts by userId
export const getContractsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userid:", userId);
    const contracts = await Contract.find({
      $or: [{ farmerId: userId }, { buyerId: userId }],
    })
      .populate("farmerId", "name email")
      .populate("buyerId", "name email");
    console.log("contract:", contracts);
    res.status(200).json({
      success: true,
      data: contracts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findById(id)
      .populate("farmerId", "name email role")
      .populate("buyerId", "name email role")
      .populate("offerId")
      .populate("requirementId");
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found",
      });
    }
    res.status(200).json({
      success: true,
      data: contract,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const confirmContract = async (req, res) => {
  try {
    const { contractId } = req.params;
    const userId = req.userObj.id;
    const userRole = req.userObj.role;

    const contract = await Contract.findById(contractId);
    console.log(contract);
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract Not found",
      });
    }

    if (contract.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: `This Contract already ${contract.status}`,
      });
    }

    // Set the confirmation flag for the current user
    if (userRole == "Farmer") {
      if (contract.farmerId.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to confirm this contract",
        });
      }
      contract.confirmation.farmerConfirmed = true;
    } else if (userRole == "Buyer") {
      if (contract.buyerId.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to confirm this contract",
        });
      }
      contract.confirmation.buyerConfirmed = true;
    }

    const itemId = contract.requirementId
      ? contract.requirementId
      : contract.buyerId;
    //remaining
    if (
      contract.confirmation.farmerConfirmed &&
      contract.confirmation.buyerConfirmed
    ) {
      contract.status = "Active";
    }
    await contract.save();

    res.status(200).json({
      success: true,
      message: "Contract confirmed successfully",
      data: contract,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const createContract = async (req, res) => {
  try {
    const {
      requestId,
      farmerId,
      buyerId,
      offerId,
      requirementId,
      crop,
      quantity,
      pricePerUnit,
      endDate,
    } = req.body;

    if (
      !farmerId ||
      !buyerId ||
      !crop ||
      !quantity ||
      !pricePerUnit ||
      !endDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const createdBy = req.userObj.id;

    // Determine who confirmed based on who created the contract
    const confirmation = {
      farmerConfirmed: req.userObj.role === "Farmer",
      buyerConfirmed: req.userObj.role === "Buyer",
    };

    const newContract = await Contract.create({
      farmerId,
      buyerId,
      offerId,
      requirementId,
      crop,
      quantity,
      pricePerUnit,
      endDate,
      createdBy,
      confirmation,
      status: "Pending",
    });

    // Optional: Update the request status to "Contracted" or similar
    const updatedRequest = await Request.findByIdAndUpdate(requestId, {
      status: "Contracted",
    });
    // console.log("updared reqest: ", updatedRequest)

    res.status(201).json({
      success: true,
      message: "Contract created and sent for confirmation",
      data: newContract,
    });
  } catch (error) {
    console.log("err:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create contract",
      error: error.message,
    });
  }
};
