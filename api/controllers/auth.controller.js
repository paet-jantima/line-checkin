import Role from "../models/Role.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import Jwt  from "jsonwebtoken"
import { CreateSuccess } from "../utils/success.js"
import { CreateError } from "../utils/error.js"

export const register = async (req, res, next) =>{

    const role = await Role.find({role: 'User'});
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userId : req.body.userId,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        jobPosition: req.body.jobPosition,
        roles: role,

    });
    await newUser.save();
    return res.status(200).json("User registered ")

}

export const registerAdmin = async (req, res, next) =>{

    const role = await Role.find({});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.userName,
        email: req.body.email,
        password: hashPassword,
        isAdmin: true,
        roles: role,

    });
    await newUser.save();
    return next(CreateSuccess(200,"Admin Registered"))

}


export const login = async (req, res, next) =>{
    try {
        const user = await User.findOne({email: req.body.email})
        .populate("roles","role");

        const { roles }= user;
        if (!user) {
            return next(CreateError(404,"User Not Found"));
        }
        const  isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(CreateError(400,"Password is incorrect"));
            
        }
        const token = Jwt.sign(
            { id: user.id, isAdmin: user.isAdmin, roles: roles },
            process.env.JWT_SECRET
        );
       res.cookie("access_token", token,{httpOnly:true})
       .status(200)
       .json({
        status: 200,
        message:"Login successful",
        data: user
       })

    } catch (error) {
        return next(CreateError(500,"Something went wrong"));
    }
}

export const loginLine = async (req, res, next) => {
    try {
      const user = await User.findOne({ userId: req.body.userId }).populate("roles", "role");

      if (!user) {
        return res.status(200).json({
          status: 200,
          message: "User not found",
          data: false,
        });
      } else {
        const token = Jwt.sign(
          { id: user.id, isAdmin: user.isAdmin, roles: user.roles },
          process.env.JWT_SECRET
        );
        res.cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json({
            status: 200,
            message: "Login successful",
            data: user,
          });
      }
    } catch (error) {
      return next(CreateError(500, "Something went wrong"));
    }
  };
  



export const checkUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ userId: req.body.user_id }).populate("roles", "role");

    if (!user) {
      return res.status(200).json({
        status: 200,
        message: "User not found",
        data: false,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User found",
      data: true,
    });
  } catch (error) {
    return next(CreateError(500, "Something went wrong"));
  }
};