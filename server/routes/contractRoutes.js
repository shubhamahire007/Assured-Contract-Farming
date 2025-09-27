import express from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { createContract, getContractData,getContractsByUserId, getContracts,confirmContract,getContractById  } from '../controllers/contractController.js';

const router = express();

router.post('/', verifyJWT, createContract);

router.get('/', verifyJWT, getContracts);
router.get('/:id', verifyJWT, getContractById);
router.get('/user/:userId', verifyJWT, getContractsByUserId);
router.get('/data-for-creation/:requestId', verifyJWT, getContractData);

router.put('/:contractId', verifyJWT, confirmContract);

export default router;