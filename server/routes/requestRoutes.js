import express from "express";
import {sendRequest, getRequests, updateRequestStatus } from '../controllers/requestController.js';
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', auth, sendRequest);
router.get('/', auth, getRequests);
router.put('/:id', auth, updateRequestStatus);

export default router;