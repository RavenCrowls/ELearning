import Cart from "../models/Cart";

export const seedCarts = async () => {
  try {
    const existingCarts = await Cart.countDocuments();
    if (existingCarts > 0) {
      console.log("Carts already seeded, skipping...");
      return;
    }

    const carts = [
      {
        CART_ID: "CART001",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        ITEMS: [
          {
            COURSE_ID: "COURSE001",
            TITLE: "Complete Web Development Bootcamp",
            PRICE: 99.99,
            IMAGE_URL:
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
          },
          {
            COURSE_ID: "COURSE003",
            TITLE: "Data Science with Python",
            PRICE: 129.99,
            IMAGE_URL:
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
          },
          {
            COURSE_ID: "COURSE005",
            TITLE: "Digital Marketing Fundamentals",
            PRICE: 79.99,
            IMAGE_URL:
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
          },
        ],
        TOTAL_PRICE: 309.97,
        PAYMENT_STATUS: "pending",
        STATUS: true,
      },
      {
        CART_ID: "CART002",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcI",
        ITEMS: [
          {
            COURSE_ID: "COURSE002",
            TITLE: "iOS Development with Swift",
            PRICE: 149.99,
            IMAGE_URL:
              "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
          },
        ],
        TOTAL_PRICE: 149.99,
        PAYMENT_STATUS: "pending",
        STATUS: true,
      },
      {
        CART_ID: "CART003",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        ITEMS: [
          {
            COURSE_ID: "COURSE004",
            TITLE: "UI/UX Design Masterclass",
            PRICE: 89.99,
            IMAGE_URL:
              "https://images.unsplash.com/photo-1561070791-2526d30994b5",
          },
          {
            COURSE_ID: "COURSE002",
            TITLE: "iOS Development with Swift",
            PRICE: 149.99,
            IMAGE_URL:
              "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
          },
        ],
        TOTAL_PRICE: 239.98,
        PAYMENT_STATUS: "paid",
        STATUS: true,
      },
      {
        CART_ID: "CART004",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcI",
        ITEMS: [
          {
            COURSE_ID: "COURSE001",
            TITLE: "Complete Web Development Bootcamp",
            PRICE: 99.99,
            IMAGE_URL:
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
          },
          {
            COURSE_ID: "COURSE004",
            TITLE: "UI/UX Design Masterclass",
            PRICE: 89.99,
            IMAGE_URL:
              "https://images.unsplash.com/photo-1561070791-2526d30994b5",
          },
          {
            COURSE_ID: "COURSE005",
            TITLE: "Digital Marketing Fundamentals",
            PRICE: 79.99,
            IMAGE_URL:
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
          },
        ],
        TOTAL_PRICE: 269.97,
        PAYMENT_STATUS: "paid",
        STATUS: true,
      },
      {
        CART_ID: "CART005",
        USER_ID: "user_2oUjQZfVMq8kLx1NpY3RtW4bHcH",
        ITEMS: [
          {
            COURSE_ID: "COURSE003",
            TITLE: "Data Science with Python",
            PRICE: 129.99,
            IMAGE_URL:
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
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
