const User = require("../models/User.js");
const { CreateError } = require("../utils/error.js");
const { CreateSuccess } = require("../utils/success.js");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return next(CreateSuccess(200, "All Users", users));
    } catch (error) {
        return next(CreateError(500, "Internal Server Error"));
    }
};

const getById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return next(CreateError(404, "User not found"));
        return next(CreateSuccess(200, "Single User", user));
    } catch (error) {
        return next(CreateError(500, "Internal Server Error"));
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser)
            return next(CreateError(404, "User not found"));
        return next(CreateSuccess(200, "User updated successfully", updatedUser));
    } catch (error) {
        return next(CreateError(500, "Failed to update user"));
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser)
            return next(CreateError(404, "User not found"));
        return next(CreateSuccess(200, "User deleted successfully", deletedUser));
    } catch (error) {
        return next(CreateError(500, "Failed to delete user"));
    }
};

module.exports = { getAllUsers, getById, updateUserById, deleteUserById };
