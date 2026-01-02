import express, { Request, Response } from "express";
import User from "../models/User";

const router = express.Router();

// Clerk webhook for user.created and session.created
router.post("/clerk-webhook", async (req: Request, res: Response) => {
  try {
    console.log("Received webhook:", JSON.stringify(req.body, null, 2)); // Log incoming webhook
    const event = req.body;

    // Handle both user.created and session.created events
    if (event.type === "user.created" || event.type === "session.created") {
      const clerkUser = event.data;
      const userId =
        event.type === "user.created" ? clerkUser.id : clerkUser.user_id;

      // Check if user already exists
      const existingUser = await User.findOne({ USER_ID: userId });

      if (existingUser) {
        console.log("User already exists in DB:", userId);
        return res.status(200).json({ message: "User already exists" });
      }

      // Fetch full user data if this is a session.created event
      let userData = clerkUser;
      if (event.type === "session.created") {
        // For session.created, we need to get user details
        // The session event has less user info, so we'll use basic data
        userData = {
          id: userId,
          email_addresses: [],
          username: "",
          first_name: "",
          last_name: "",
          image_url: "",
        };
      }

      // Create new user in MongoDB
      const newUser = new User({
        USER_ID: userId,
        ROLE_ID: "2", // Default to User role
        NAME: (userData.first_name || "") + " " + (userData.last_name || ""),
        ADDRESS: "",
        PHONE: "",
        BIRTH_DATE: null,
        EMAIL: userData.email_addresses?.[0]?.email_address || "",
        USERNAME:
          userData.username ||
          userData.email_addresses?.[0]?.email_address ||
          "",
        PASSWORD: "", // Not stored, handled by Clerk
        AVATAR:
          userData.image_url ||
          "https://res.cloudinary.com/djf63iwha/image/upload/v1750324534/s3491d6v5qxa1_hq1msl.png",
        BIO: "",
        JOIN_DATE: new Date(),
        STATUS: true,
      });
      await newUser.save();
      console.log("User created in DB:", userId);
      return res.status(201).json({ message: "User created in DB" });
    }

    res.status(200).json({ message: "Event ignored" });
  } catch (error) {
    console.error("Webhook error:", error); // Log error
    res.status(500).json({ message: "Error processing webhook", error });
  }
});

export default router;
