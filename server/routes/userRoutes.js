import express from "express";
import { login, signUp,getFarmers,getBuyers,deleteUser } from "../controllers/userController.js";
import { isFarmer, auth, isBuyer, isAdmin } from "../middlewares/authMiddleware.js";
import { get } from "mongoose";

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);

router.get('/farmers', auth, isAdmin, getFarmers);

router.get('/buyers', auth, isAdmin, getBuyers);

router.delete('/:id', auth, isAdmin, deleteUser);

export default router;