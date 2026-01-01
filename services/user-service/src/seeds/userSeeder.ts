import User from "../models/User";

export const seedUsers = async () => {
  try {
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.log("Users already seeded, skipping...");
      return;
    }

    const users = [
      {
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcE",
        EMAIL: "admin@example.com",
        NAME: "Admin User",
        USERNAME: "admin",
        PASSWORD: "hashedpassword123",
        PHONE: "1234567890",
        ROLE_ID: "R001",
        AVATAR: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
        ADDRESS: "123 Admin Street",
        BIRTH_DATE: new Date("1990-01-01"),
        BIO: "System Administrator",
        JOIN_DATE: new Date(),
        STATUS: true,
      },
      {
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcF",
        EMAIL: "instructor1@example.com",
        NAME: "John Smith",
        USERNAME: "johnsmith",
        PASSWORD: "hashedpassword123",
        PHONE: "1234567891",
        ROLE_ID: "R002",
        AVATAR: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        ADDRESS: "456 Instructor Ave",
        BIRTH_DATE: new Date("1985-05-15"),
        BIO: "Web Development Instructor",
        JOIN_DATE: new Date(),
        STATUS: true,
      },
      {
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcG",
        EMAIL: "instructor2@example.com",
        NAME: "Sarah Johnson",
        USERNAME: "sarahj",
        PASSWORD: "hashedpassword123",
        PHONE: "1234567892",
        ROLE_ID: "R002",
        AVATAR: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        ADDRESS: "789 Teacher Blvd",
        BIRTH_DATE: new Date("1988-08-20"),
        BIO: "Data Science Instructor",
        JOIN_DATE: new Date(),
        STATUS: true,
      },
      {
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        EMAIL: "student1@example.com",
        NAME: "Michael Brown",
        USERNAME: "michaelb",
        PASSWORD: "hashedpassword123",
        PHONE: "1234567893",
        ROLE_ID: "R003",
        AVATAR: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        ADDRESS: "321 Student Lane",
        BIRTH_DATE: new Date("2000-03-10"),
        BIO: "Aspiring Developer",
        JOIN_DATE: new Date(),
        STATUS: true,
      },
      {
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcI",
        EMAIL: "student2@example.com",
        NAME: "Emily Davis",
        USERNAME: "emilyd",
        PASSWORD: "hashedpassword123",
        PHONE: "1234567894",
        ROLE_ID: "R003",
        AVATAR: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        ADDRESS: "654 Learner Road",
        BIRTH_DATE: new Date("1999-11-25"),
        BIO: "Data Science Enthusiast",
        JOIN_DATE: new Date(),
        STATUS: true,
      },
    ];

    await User.insertMany(users);
    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
};
