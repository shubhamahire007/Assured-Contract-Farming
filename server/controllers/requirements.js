import Requirement from '../models/requirementModel.js';
import dotenv from 'dotenv';

dotenv.config();

export const postRequirements = async (req,res) => {
    try {
        const {crop, quantity, expectedPrice, neededBy} = req.body;
        const buyerId = req.userObj.id;

        await Requirement.create({
            crop,
            quantity,
            expectedPrice,
            neededBy,
            buyerId
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
        const requirements = await Requirement.find();
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
        const { crop, quantity, expectedPrice, neededBy } = req.body;

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