import { Request, Response } from "express";
import User, { IUser } from "../models/User";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const {
        USER_ID,
        ROLE_ID,
        NAME,
        ADDRESS,
        PHONE,
        BIRTH_DATE,
        EMAIL,
        USERNAME,
        PASSWORD,
        AVATAR,
        BIO,
        JOIN_DATE,
        STATUS,
      } = req.body;
      const newUser = new User({
        USER_ID,
        ROLE_ID,
        NAME,
        ADDRESS,
        PHONE,
        BIRTH_DATE,
        EMAIL,
        USERNAME,
        PASSWORD,
        AVATAR,
        BIO,
        JOIN_DATE,
        STATUS,
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      // Add pagination and field selection
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const skip = (page - 1) * limit;

      const [userList, total] = await Promise.all([
        User.find({ STATUS: 1 })
          .select("-PASSWORD -__v") // Never return passwords
          .skip(skip)
          .limit(limit)
          .lean(),
        User.countDocuments({ STATUS: 1 }),
      ]);

      res.status(200).json({
        users: userList,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error getting users", error });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ USER_ID: userId, STATUS: 1 })
        .select("-PASSWORD -__v") // Never return password
        .lean();
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
      const {
        NAME,
        ADDRESS,
        PHONE,
        BIRTH_DATE,
        EMAIL,
        USERNAME,
        PASSWORD,
        AVATAR,
        BIO,
      } = req.body;
      const data = {
        NAME,
        ADDRESS,
        PHONE,
        BIRTH_DATE,
        EMAIL,
        USERNAME,
        PASSWORD,
        AVATAR,
        BIO,
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
      const deletedUser = await User.findOne({ USER_ID: userId, STATUS: 1 });
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      deletedUser.STATUS = false;
      await deletedUser.save();
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  }

  // Sync user from Clerk - create if doesn't exist, update if exists
  async syncUserFromClerk(req: Request, res: Response) {
    try {
      const { userId, email, username, firstName, lastName, imageUrl } =
        req.body;

      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }

      // Check if user already exists
      let user = await User.findOne({ USER_ID: userId });

      if (user) {
        // Update existing user with latest Clerk data
        user.EMAIL = email || user.EMAIL;
        user.USERNAME = username || email || user.USERNAME;
        user.NAME =
          firstName && lastName ? `${firstName} ${lastName}` : user.NAME;
        user.AVATAR = imageUrl || user.AVATAR;
        await user.save();

        return res.status(200).json({
          message: "User synced successfully",
          user,
          isNew: false,
        });
      }

      // Create new user
      const newUser = new User({
        USER_ID: userId,
        ROLE_ID: "2", // Default to User role
        NAME:
          firstName && lastName
            ? `${firstName} ${lastName}`
            : username || "User",
        ADDRESS: "",
        PHONE: "",
        BIRTH_DATE: null,
        EMAIL: email || "",
        USERNAME: username || email || userId,
        PASSWORD: "", // Not stored, handled by Clerk
        AVATAR:
          imageUrl ||
          "https://res.cloudinary.com/djf63iwha/image/upload/v1750324534/s3491d6v5qxa1_hq1msl.png",
        BIO: "",
        JOIN_DATE: new Date(),
        STATUS: true,
      });

      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
        user: newUser,
        isNew: true,
      });
    } catch (error) {
      console.error("Error syncing user from Clerk:", error);
      res.status(500).json({ message: "Error syncing user", error });
    }
  }
}

export default UserController;
