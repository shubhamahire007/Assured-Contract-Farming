import express from "express";
import { login, signUp } from "../controllers/userController.js";
import { isFarmer, auth, isBuyer, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);

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