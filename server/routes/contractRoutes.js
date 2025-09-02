import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { createContract, getContractData,getContractsByUserId, getContracts,confirmContract,getContractById  } from '../controllers/contractController.js';

const router = express();

router.post('/', auth, createContract);

router.get('/', auth, getContracts);
router.get('/:id', auth, getContractById);
router.get('/user/:userId', auth, getContractsByUserId);
router.get('/data-for-creation/:requestId', auth, getContractData);

router.put('/:contractId', auth, confirmContract);

export default router;