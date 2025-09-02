import Requirement from '../models/requirementModel.js';
import Request from '../models/requestModel.js';
import dotenv from 'dotenv';
import Contract from '../models/contractModel.js';

dotenv.config();

export const postRequirements = async (req,res) => {
    try {
        const {crop, quantity, expectedPrice, neededBy} = req.body;
        if(!crop || !quantity || !expectedPrice || !neededBy) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }
        const buyerId = req.userObj.id;

        await Requirement.create({
            crop,
            quantity,
            expectedPrice,
            neededBy,
            buyerId,
            description: req.body.description || "",
            location: req.body.location || "",
        });
        return res.status(200).json({
            success:true,
            message: "Requirements saved successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Failed to Post Requirements",
            error: error.message
        });
    }
}

export const getRequirements = async (req,res) => {
    try {
        // const requirements = await Requirement.find();
        const requirements = await Requirement.find().populate('buyerId','name').lean() // for plain JS objects;
        const userId = req.userObj.id;
        
        // Find all requests sent by the current user for any of the fetched requirements
        const requirementIds = requirements.map(r => r._id);
        const userRequests = await Request.find({
            senderId: userId,
            requirementId: { $in: requirementIds }
        });
        
        // Create a map for quick lookups
        const requestStatusMap = new Map();
        userRequests.forEach(request => {
            requestStatusMap.set(request.requirementId.toString(), request.status);
        });
        
        // Attach the request status to each requirement
        const requirementsWithStatus = requirements.map(requirement => {
            return {
                ...requirement,
                requestStatus: requestStatusMap.get(requirement._id.toString()) || null
            };
        });
     
        return res.status(200).json({
            success: true,
            message: "Requirements fetched successfully",
            data: requirementsWithStatus
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch requirements",
            error: error.message
        });
    }
}

export const getRequirementById = async (req, res) => {
    try {
        const { id } = req.params;
        const requirement = await Requirement.findById(id);
        if (!requirement) {
            return res.status(404).json({
                success: false,
                message: "Requirement not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Requirement fetched successfully",
            data: requirement
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch requirement",
            error: error.message
        });
    }
}

export const getRequirementByBuyerId = async (req,res) => {
    try {
        const {id} = req.params;
        const requirements = await Requirement.find({buyerId: id});
        if(requirements.length == 0){
            return res.status(404).json({
                success: false,
                message: "No requirements found for this buyer"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Requirements fetched successfully",
            data: requirements
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch requirements",
            error: error.message
        });
    }
}

export const editRequirement = async (req,res) => {
    try {
        const { id } = req.params;
        const { crop, quantity, expectedPrice, neededBy, description, location } = req.body;

        const requirement = await Requirement.findById(id);

        if (!requirement) {
            return res.status(404).json({
                success: false,
                message: "Requirement not found"
            });
        }

        const userId = req.userObj.id;
        // console.log("userid: ",userId)
        // console.log("buyer id: ", requirement.buyerId.toString())
        if(userId !== requirement.buyerId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to edit this requirement"
            });
        }

        requirement.crop = crop || requirement.crop;
        requirement.quantity = quantity || requirement.quantity;
        requirement.expectedPrice = expectedPrice || requirement.expectedPrice;
        requirement.neededBy = neededBy || requirement.neededBy;
        requirement.description = description || requirement.description;
        requirement.location = location || requirement.location;

        await Requirement.findByIdAndUpdate(id, requirement, { new: true });

        return res.status(200).json({
            success: true,
            message: "Requirement updated successfully",
            data: requirement
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
                message: "Failed to update requirement",
                error: error.message
        });
    }
}

export const deleteRequirement = async (req,res) => {
    try {
        const {id} = req.params;

        const requirement = await Requirement.findById(id);

        if(!requirement){
            return res.status(404).json({
                success: false,
                message: "Requirement not found"
            });
        }

        const userId = req.userObj.id;

        if(userId !== requirement.buyerId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this requirement"
            });
        }

        await Request.deleteMany({ requirementId: id });
        // await Contract.deleteMany({ requirementId: id });

        await Requirement.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Requirement deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Failed to Delete requirement",
            error: error.message
        });
    }
}