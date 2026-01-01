import Category from "../models/Category";

export const seedCategories = async () => {
  try {
    const existingCategories = await Category.countDocuments();
    if (existingCategories > 0) {
      console.log("Categories already seeded, skipping...");
      return;
    }

    const categories = [
      {
        CATEGORY_ID: "CAT001",
        NAME: "Web Development",
        SUB_CATEGORIES: [
          {
            SUB_CATEGORY_ID: "SC001",
            NAME: "Frontend Development",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: "SC002",
            NAME: "Backend Development",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: "SC003",
            NAME: "Full Stack Development",
            STATUS: true,
          },
        ],
        STATUS: true,
      },
      {
        CATEGORY_ID: "CAT002",
        NAME: "Mobile Development",
        SUB_CATEGORIES: [
          { SUB_CATEGORY_ID: "SC004", NAME: "iOS Development", STATUS: true },
          {
            SUB_CATEGORY_ID: "SC005",
            NAME: "Android Development",
            STATUS: true,
          },
          { SUB_CATEGORY_ID: "SC006", NAME: "React Native", STATUS: true },
        ],
        STATUS: true,
      },
      {
        CATEGORY_ID: "CAT003",
        NAME: "Data Science",
        SUB_CATEGORIES: [
          { SUB_CATEGORY_ID: "SC007", NAME: "Machine Learning", STATUS: true },
          { SUB_CATEGORY_ID: "SC008", NAME: "Data Analysis", STATUS: true },
          { SUB_CATEGORY_ID: "SC009", NAME: "Deep Learning", STATUS: true },
        ],
        STATUS: true,
      },
      {
        CATEGORY_ID: "CAT004",
        NAME: "Design",
        SUB_CATEGORIES: [
          { SUB_CATEGORY_ID: "SC010", NAME: "UI/UX Design", STATUS: true },
          { SUB_CATEGORY_ID: "SC011", NAME: "Graphic Design", STATUS: true },
          { SUB_CATEGORY_ID: "SC012", NAME: "Web Design", STATUS: true },
        ],
        STATUS: true,
      },
      {
        CATEGORY_ID: "CAT005",
        NAME: "Business",
        SUB_CATEGORIES: [
          { SUB_CATEGORY_ID: "SC013", NAME: "Marketing", STATUS: true },
          { SUB_CATEGORY_ID: "SC014", NAME: "Management", STATUS: true },
          { SUB_CATEGORY_ID: "SC015", NAME: "Entrepreneurship", STATUS: true },
        ],
        STATUS: true,
      },
    ];

    await Category.insertMany(categories);
    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error seeding categories:", error);
    throw error;
  }
};
