import Offer from '../models/offerModel.js';
import Request from '../models/requestModel.js';
import dotenv from 'dotenv';

dotenv.config();

export const postOffer = async (req,res) => {
    try {
        const {crop, quantity, expectedPrice, expectedDuration} = req.body;
        const farmerId = req.userObj.id;
        const offer = await Offer.create({
            crop,
            quantity,
            expectedPrice,
            expectedDuration,
            farmerId              
        });
        return res.status(201).json({
            success: true,
            message: "Offer posted successfully",
            data: offer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error posting offer",
            error: error.message
        });
    }
}

export const getOffers = async (req, res) => {
    try {
        // const offers = await Offer.find();
        const offers = await Offer.find().populate('farmerId','name').lean();
        const userId = req.userObj.id;
        console.log("user id", userId)

        // Find all requests sent by the current user for any of the fetched offers
        const offerIds = offers.map(o => o._id);
        console.log("offer ids", offerIds)
        const userRequests = await Request.find({
            senderId: userId,
            offerId: { $in: offerIds }
        });
        console.log("user requests: ", userRequests);
        // Create a map for quick lookups
        const requestStatusMap = new Map();
        userRequests.forEach(request => {
            requestStatusMap.set(request.offerId.toString(), request.status);
        });

        // Attach the request status to each offer
        const offersWithStatus = offers.map(offer => {
            return {
                ...offer,
                requestStatus: requestStatusMap.get(offer._id.toString()) || null
            };
        });

        return res.status(200).json({
            success: true,
            data: offersWithStatus,
            message: "Offers fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching offers",
            error: error.message
        });
    }
}

export const getOfferById = async (req, res) => {
    try {
        const {id} = req.params;
        const offer = await Offer.findById(id);
        if (!offer) {
            return res.status(404).json({
                success: false,
                message: "Offer not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: offer,
            message: "Offer fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching offer",
            error: error.message
        });
    }
}

export const getOfferByFarmerId = async (req,res) => {
    try {
        const {id} = req.params;
        const offers = await Offer.find({farmerId: id});
        if (offers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No offers found for this farmer"
            });
        }
        return res.status(200).json({
            success: true,
            data: offers,
            message: "Offers fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching offers",
            error: error.message
        });             
    }
}

export const updateOffer = async (req,res) => {
    try {
        const {id} = req.params;
        const {crop, quantity, expectedPrice, expectedDuration} = req.body;
        const offer = await Offer.findByIdAndUpdate(id, {
            crop,
            quantity,
            expectedPrice,
            expectedDuration
        }, {new: true});
        if (!offer) {
            return res.status(404).json({
                success: false,
                message: "Offer not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: offer,
            message: "Offer updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating offer",
            error: error.message
        });
    }
}

export const deleteOffer = async (req,res) => {
    try {
        const {id} = req.params;
        const offer = await Offer.findById(id);
        if (!offer) {
            return res.status(404).json({
                success: false,
                message: "Offer not found"
            });
        }

        const farmerId = offer.farmerId.toString();
        const userId = req.userObj.id;
     
        if(userId !== farmerId){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this offer"
            });
        }

        await Request.deleteMany({ offerId: id });
        
        await Offer.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Offer deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting offer",
            error: error.message
        });
    }
}