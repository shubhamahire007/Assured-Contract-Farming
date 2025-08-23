import Requirement from '../models/requirementModel.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const saveRequirements = async (req,res) => {
    try {
        const {crop, quantity, expectedPrice, neededBy} = req.body;
        const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const buyerId = decoded.id;
        await Requirement.create({
            crop,
            quantity,
            expectedPrice,
            neededBy,
            buyerId
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Failed to Post Requirements",
            error: error.message
        });
    }
    return res.status(200).json({
        success:true,
        message: "Requirements saved successfully"
    })
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