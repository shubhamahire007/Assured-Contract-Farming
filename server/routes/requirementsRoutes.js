import express from "express";
import { getRequirements, postRequirements, getRequirementById,getRequirementByBuyerId, editRequirement, deleteRequirement } from "../controllers/requirements.js";
import {auth, isBuyer, isFarmer } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/', auth, isBuyer, postRequirements);
router.get('/', auth, getRequirements);
router.get('/req/:id', auth, getRequirementById);
router.get('/buyer/:id', auth, getRequirementByBuyerId);
router.put('/:id', auth, isBuyer, editRequirement);
router.delete('/:id', auth, isBuyer, deleteRequirement);

export default router;