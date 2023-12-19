const Role = require("../models/Role.js");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const { CreateSuccess } = require("../utils/success.js");
const { CreateError } = require("../utils/error.js");

const register = async (req, res, next) => {
    const role = await Role.find({ role: 'User' });
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userId: req.body.userId,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        jobPosition: req.body.jobPosition,
        roles: role,
    });
    await newUser.save();
    return res.status(200).json("User registered ");
};

const registerAdmin = async (req, res, next) => {
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
    return next(CreateSuccess(200, "Admin Registered"));
};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }).populate("roles", "role");

        const { roles } = user;
        if (!user) {
            return next(CreateError(404, "User Not Found"));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(CreateError(400, "Password is incorrect"));
        }
        const token = Jwt.sign(
            { id: user.id, isAdmin: user.isAdmin, roles: roles },
            process.env.JWT_SECRET
        );
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({
                status: 200,
                message: "Login successful",
                data: user
            });
    } catch (error) {
        return next(CreateError(500, "Something went wrong"));
    }
};

const loginLine = async (req, res, next) => {
    const role = await Role.find({ role: 'User' });
    try {
        const user = await User.findOne({ userId: req.body.userId }).populate("roles", "role");

        if (!user) {

            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                userId: req.body.userId,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                jobPosition: req.body.jobPosition,
                profileImage: req.body.profileImage,
                roles: role,
            });
            await newUser.save();
        }
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

    } catch (error) {
        return next(CreateError(500, "Something went wrong"));
    }
};

const checkUserById = async (req, res, next) => {
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

module.exports = {
    register,
    registerAdmin,
    login,
    loginLine,
    checkUserById,
};
