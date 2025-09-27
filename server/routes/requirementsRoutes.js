import express from "express";
import { getRequirements, postRequirements, getRequirementById,getRequirementByBuyerId, editRequirement, deleteRequirement } from "../controllers/requirements.js";
import {verifyJWT, isBuyer, isFarmer } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/', verifyJWT, isBuyer, postRequirements);
router.get('/', verifyJWT, getRequirements);
router.get('/req/:id', verifyJWT, getRequirementById);
router.get('/buyer/:id', verifyJWT, getRequirementByBuyerId);
router.put('/:id', verifyJWT, isBuyer, editRequirement);
router.delete('/:id', verifyJWT, isBuyer, deleteRequirement);

export default router;