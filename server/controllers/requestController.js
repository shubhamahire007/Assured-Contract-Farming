import Request from "../models/requestModel.js";
import Requirement from "../models/requirementModel.js";
import Offer from "../models/offerModel.js";

export const sendRequest = async (req, res) => {
  try {
    const { requirementId, offerId } = req.body;
    const senderId = req.userObj.id;
    let receiverId;
    let existingRequest;

    if(requirementId) {
        const requirement = await Requirement.findById(requirementId)
        if(!requirement) { 
            return res.status(404).json({message: "Requirement not found"})
        }
        receiverId = requirement.buyerId;
        existingRequest = await Request.findOne({senderId, requirementId})

    } else if(offerId) {
        const offer = await Offer.findById(offerId)
        if(!offer) {
            return res.status(404).json({message: "Offer not found"})
        }
        receiverId = offer.farmerId;
        existingRequest = await Request.findOne({senderId, offerId});
    }else {
      return res.status(400).json({ success: false, message: "Requirement ID or Offer ID is required" });
    }

    if(existingRequest) {
        return res.status(409).json({
            success:false,
            message: "You have already sent a request"
        });
    }

    const newRequest = await Request.create({
        senderId, receiverId, requirementId:requirementId || undefined, offerId:offerId || undefined
    });
    
    res.status(201).json({
      success: true,
      message: "Request sent successfully",
      data: newRequest,
    });
  } catch (error) {
    res.status(500).json({ 
        success: false,
        message: "Error sending request",
        error: error.message
    });
  }
};

export const getRequests = async (req, res) => {
    try {
        const userId = req.userObj.id;
        const requests = await Request.find({
            $or:[{senderId:userId},{receiverId:userId}]
        })
        .populate('senderId', 'name role isVerified')
        .populate('receiverId', 'name role isVerified')
        .populate({ path: 'requirementId', select: 'crop quantity expectedPrice neededBy location description' })
        .populate({ path: 'offerId', select: 'crop quantity expectedPrice expectedDuration location description' });

        res.status(200).json({
            success: true,
            message: "Requests fetched successfully",
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching requests",
            error
        });
    }
};

export const updateRequestStatus = async (req,res) => {
    try {
        const { id: requestId } = req.params;
        const {status} = req.body; // Accepted or Rejected
        const userId = req.userObj.id;

        if (!['Accepted', 'Rejected'].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const request = await Request.findById(requestId);

        if(!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }
        if (request.receiverId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Not authorized to update this request" });
        }

        request.status = status;
        await request.save();

        res.status(200).json({ 
            success: true, 
            message: `Request ${status}` 
        });    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating request status",
            error
        });
    }
}