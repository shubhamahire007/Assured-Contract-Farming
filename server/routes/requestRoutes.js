import express from "express";
import {sendRequest, getRequests, updateRequestStatus } from '../controllers/requestController.js';
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', verifyJWT, sendRequest);
router.get('/', verifyJWT, getRequests);
router.put('/:id', verifyJWT, updateRequestStatus);

export default router;