import express from "express";
import { login, signUp,getFarmers,getBuyers,deleteUser } from "../controllers/userController.js";
import { verifyJWT, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);

router.get('/farmers', verifyJWT, isAdmin, getFarmers);

router.get('/buyers', verifyJWT, isAdmin, getBuyers);

router.delete('/:id', verifyJWT, isAdmin, deleteUser);

export default router;