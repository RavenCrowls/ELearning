import Cart from "../models/Cart";
import { generateCartId } from "../utils/idGenerator";

export const seedCarts = async () => {
  try {
    const existingCarts = await Cart.countDocuments();
    if (existingCarts > 0) {
      console.log("Carts already seeded, skipping...");
      return;
    }

    const carts = [
      {
        CART_ID: generateCartId(),
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        ITEMS: [
          {
            COURSE_ID: "COURSE001",
            TITLE: "Complete Web Development Bootcamp",
            PRICE: 99.99,
            IMAGE_URL:
              "https://img.freepik.com/premium-photo/friends-people-group-teamwork-diversity_53876-58685.jpg?ga=GA1.1.64842012.1748338142&semt=ais_items_boosted&w=740",
          },
          {
            COURSE_ID: "COURSE003",
            TITLE: "Data Science with Python",
            PRICE: 129.99,
            IMAGE_URL:
              "https://img.freepik.com/premium-photo/friends-people-group-teamwork-diversity_53876-58685.jpg?ga=GA1.1.64842012.1748338142&semt=ais_items_boosted&w=740",
          },
          {
            COURSE_ID: "COURSE005",
            TITLE: "Digital Marketing Fundamentals",
            PRICE: 79.99,
            IMAGE_URL:
              "https://res.cloudinary.com/djf63iwha/image/upload/v1751041659/elearning-courses/f55yld4x2urkjbzsrejd.jpg",
          },
        ],
        TOTAL_PRICE: 309.97,
        PAYMENT_STATUS: "pending",
        STATUS: true,
      },
      {
        CART_ID: generateCartId(),
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcI",
        ITEMS: [
          {
            COURSE_ID: "COURSE002",
            TITLE: "iOS Development with Swift",
            PRICE: 149.99,
            IMAGE_URL:
              "https://res.cloudinary.com/djf63iwha/image/upload/v1751039713/elearning-courses/xr37lim9inunghf6dk86.jpg",
          },
        ],
        TOTAL_PRICE: 149.99,
        PAYMENT_STATUS: "pending",
        STATUS: true,
      },
      {
        CART_ID: generateCartId(),
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        ITEMS: [
          {
            COURSE_ID: "COURSE004",
            TITLE: "UI/UX Design Masterclass",
            PRICE: 89.99,
            IMAGE_URL:
              "https://res.cloudinary.com/djf63iwha/image/upload/v1751160620/elearning-courses/y35rh0dgtfsnk9fbpgad.jpg",
          },
          {
            COURSE_ID: "COURSE002",
            TITLE: "iOS Development with Swift",
            PRICE: 149.99,
            IMAGE_URL:
              "https://res.cloudinary.com/djf63iwha/image/upload/v1751039713/elearning-courses/xr37lim9inunghf6dk86.jpg",
          },
        ],
        TOTAL_PRICE: 239.98,
        PAYMENT_STATUS: "paid",
        STATUS: true,
      },
      {
        CART_ID: generateCartId(),
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcI",
        ITEMS: [
          {
            COURSE_ID: "COURSE001",
            TITLE: "Complete Web Development Bootcamp",
            PRICE: 99.99,
            IMAGE_URL:
              "https://img.freepik.com/premium-photo/friends-people-group-teamwork-diversity_53876-58685.jpg?ga=GA1.1.64842012.1748338142&semt=ais_items_boosted&w=740",
          },
          {
            COURSE_ID: "COURSE004",
            TITLE: "UI/UX Design Masterclass",
            PRICE: 89.99,
            IMAGE_URL:
              "https://res.cloudinary.com/djf63iwha/image/upload/v1751160620/elearning-courses/y35rh0dgtfsnk9fbpgad.jpg",
          },
          {
            COURSE_ID: "COURSE005",
            TITLE: "Digital Marketing Fundamentals",
            PRICE: 79.99,
            IMAGE_URL:
              "https://res.cloudinary.com/djf63iwha/image/upload/v1751041659/elearning-courses/f55yld4x2urkjbzsrejd.jpg",
          },
        ],
        TOTAL_PRICE: 269.97,
        PAYMENT_STATUS: "paid",
        STATUS: true,
      },
      {
        CART_ID: generateCartId(),
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        ITEMS: [
          {
            COURSE_ID: "COURSE003",
            TITLE: "Data Science with Python",
            PRICE: 129.99,
            IMAGE_URL:
              "https://img.freepik.com/premium-photo/friends-people-group-teamwork-diversity_53876-58685.jpg?ga=GA1.1.64842012.1748338142&semt=ais_items_boosted&w=740",
          },
        ],
        TOTAL_PRICE: 129.99,
        PAYMENT_STATUS: "pending",
        STATUS: true,
      },
    ];

    await Cart.insertMany(carts);
    console.log("✓ Carts seeded successfully");
  } catch (error) {
    console.error("Error seeding carts:", error);
    throw error;
  }
};
