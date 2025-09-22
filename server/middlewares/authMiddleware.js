import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
// verify jwt token middleware
export const auth = (req,res,next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];// Bearer <token>

        if(!token) {
            return res.status(401).json({
                success:false,
                message:"Token missing"
            });
        }

        //verify token
        try {
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
            req.userObj = decodedToken; //stored decode(payload(role,email)) in userObj
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error: error.message
        });
    }
}

export const isFarmer = (req,res,next) => {
    try {
        if(req.userObj.role !== 'Farmer'){
            return res.status(403).json({
                success:false,
                message:"Access denied"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
}

export const isBuyer = (req,res,next) => {
    try {
        if(req.userObj.role !== 'Buyer'){
            return res.status(403).json({
                success:false,
                message:"Access denied"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
}

export const isAdmin = (req,res,next) => {
    try {
        if(req.userObj.role !== 'Admin'){
            return res.status(403).json({
                success:false,
                message:"Access denied"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
}
