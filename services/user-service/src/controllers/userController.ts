import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { USER_ID, NAME, EMAIL, AVATAR, BIO, JOIN_DATE, STATUS, ENROLLMENTS } = req.body;
            const newUser = new User({
                USER_ID,
                NAME,
                EMAIL,
                AVATAR,
                BIO,
                JOIN_DATE,
                STATUS,
                ENROLLMENTS
            });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const userList = await User.find({ STATUS: 1 });
            res.status(200).json(userList);
        } catch (error) {
            res.status(500).json({ message: "Error getting users", error });
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const user = await User.findOne({ USER_ID: userId, STATUS: 1 });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Error getting user", error });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { NAME, EMAIL, AVATAR, BIO, JOIN_DATE, ENROLLMENTS } = req.body;
            const data = {
                NAME,
                EMAIL,
                AVATAR,
                BIO,
                JOIN_DATE,
                ENROLLMENTS
            };
            const updatedUser = await User.findOneAndUpdate(
                { USER_ID: userId, STATUS: 1 },
                data,
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: "Error updating user", error });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const user = await User.findOne({ USER_ID: userId, STATUS: 1 });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            user.STATUS = false;
            await user.save();
            res.status(200).json({ message: "User status updated to 0", user });
        } catch (error) {
            res.status(500).json({ message: "Error updating user status", error });
        }
    }
}

export default UserController;