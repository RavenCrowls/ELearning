const User = require("../models/User");

const createUser = async (req, res) => {
    try {
        const { id, name, email, avatar, bio, join_date, status, enrollments, } = req.body;
        const newUser = new User({ id, name, email, avatar, bio, join_date, status, enrollments });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

const getAllUser = async (req, res) => {
    try {
        const userList = await User.find();
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({ message: "Error getting users", error });
    }
}

const getDetailUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ id: userId });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error getting user", error });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await User.deleteOne({ id: userId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
}

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, avatar, bio, join_date, status, enrollments, } = req.body;
        const data = { name, email, avatar, bio, join_date, status, enrollments };
        const updateUser = await User.findOneAndUpdate({ id: userId }, data, { new: true });
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
}

module.exports = {
    createUser,
    getAllUser,
    getDetailUser,
    deleteUser,
    updateUser,
};
