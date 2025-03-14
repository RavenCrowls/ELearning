const User = require("../models/User");

const createUser = async (req, res) => {
    try {
        const { id, name, email, avatar, bio, join_date, status, enrollments, } = req.body;
        const newUser = new User({ id, name, email, avatar, bio, join_date, status, enrollments });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    createUser,
};
