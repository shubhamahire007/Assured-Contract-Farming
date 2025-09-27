import express from "express";
import {verifyJWT, isFarmer} from '../middlewares/authMiddleware.js';
import { postOffer,getOffers, getOfferById, getOfferByFarmerId,updateOffer,deleteOffer } from "../controllers/offers.js";

const router = express.Router();

router.post('/', verifyJWT, isFarmer, postOffer);
router.get('/', verifyJWT, getOffers);
router.get('/:id', verifyJWT, getOfferById);
router.get('/farmer/:id', verifyJWT, getOfferByFarmerId);
router.put('/:id', verifyJWT, isFarmer, updateOffer);
router.delete('/:id', verifyJWT, isFarmer, deleteOffer);

export default router;