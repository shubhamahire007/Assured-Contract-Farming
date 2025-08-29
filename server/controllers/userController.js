import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //check is user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already present",
      });
    }

    //hashed password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "problem occurred during hashing",
      });
    }

    //store user in db
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill details",
      });
    }

    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not registered. Do signUp",
      });
    }

    let isMatch = await bcrypt.compare(password, userData.password);
    if (isMatch) {
      const payload = {
        email: userData.email,
        role: userData.role,
        id: userData._id,
      };
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "5h",
      });
      const userObj = userData.toObject();
      // console.log(userObj)
      userObj.password = undefined;
      userObj.token = token;
      // const options = {
      //   expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      //   httpOnly: true, // means it cant access at client side
      // };
      // res.cookie("myToken", token, options).status(200).json({
      //   success: true,
      //   message: "login success",
      //   userObj,
      //   token,
      // });
      res.status(200).json({
        success: true,
        message: "login success",
        userObj,
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getFarmers = async (req, res) => {
  try {
    const farmers = await User.find({ role: "Farmer" });

    if (!farmers) {
      return res.status(404).json({
        success: false,
        message: "No farmers found",
      });
    }

    return res.status(200).json({
      success: true,
      data: farmers,
      message: "Farmers fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getBuyers = async (req, res) => {
  try {
    const buyers = await User.find({ role: "Buyer" });

    if (!buyers) {
      return res.status(404).json({
        success: false,
        message: "No Buyers found",
      });
    }
    return res.status(200).json({
      success: true,
      data: buyers,
      message: "Buyers fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
