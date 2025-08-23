import express from "express";
import { login, signUp } from "../controllers/userController.js";
import { getRequirements, saveRequirements, getRequirementById,getRequirementByBuyerId } from "../controllers/requirements.js";
import { isFarmer, auth, isBuyer, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get('/test' , (req,res) => {
    res.json({ 
        message: "Test route working" 
    });
})

router.post('/login', login);
router.post('/signup', signUp);

router.post('/requirements', auth, isBuyer, saveRequirements);
router.get('/requirements', auth, getRequirements);
router.get('/requirements/req/:id', auth, getRequirementById);
router.get('/requirements/buyer/:id', auth, getRequirementByBuyerId);

router.get('/farmer', auth, isFarmer, (req,res) => {
    res.json({
        message: "Welcome Farmer"
    });
})

router.get('/buyer', auth, isBuyer, (req,res) => {
    res.json({
        message: "Welcome Buyer"
    });
})

router.get('/admin', auth, isAdmin, (req,res) => {
    res.json({
        message: "Welcome Admin"
    });
})

export default router;