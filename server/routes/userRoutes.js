import express from "express";
import { login, signUp,getFarmers,getBuyers,deleteUser } from "../controllers/userController.js";
import { auth, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);

router.get('/farmers', auth, isAdmin, getFarmers);

router.get('/buyers', auth, isAdmin, getBuyers);

router.delete('/:id', auth, isAdmin, deleteUser);

export default router;