import express from "express";
import {auth, isFarmer} from '../middlewares/authMiddleware.js';
import { postOffer,getOffers, getOfferById, getOfferByFarmerId,updateOffer,deleteOffer } from "../controllers/offers.js";

const router = express.Router();

router.post('/', auth, isFarmer, postOffer);
router.get('/', auth, getOffers);
router.get('/:id', auth, getOfferById);
router.get('/farmer/:id', auth, getOfferByFarmerId);
router.put('/:id', auth, isFarmer, updateOffer);
router.delete('/:id', auth, isFarmer, deleteOffer);

export default router;