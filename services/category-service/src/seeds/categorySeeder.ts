import Category from "../models/Category";
import {
  generateCategoryId,
  generateSubCategoryId,
} from "../utils/idGenerator";

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
            SUB_CATEGORY_ID: "SUBCAT001",
            NAME: "Frontend Development",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: "SUBCAT002",
            NAME: "Backend Development",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: "SUBCAT003",
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
          {
            SUB_CATEGORY_ID: "SUBCAT004",
            NAME: "iOS Development",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: "SUBCAT005",
            NAME: "Android Development",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: "SUBCAT006",
            NAME: "React Native",
            STATUS: true,
          },
        ],
        STATUS: true,
      },
      {
        CATEGORY_ID: "CAT003",
        NAME: "Data Science",
        SUB_CATEGORIES: [
          {
            SUB_CATEGORY_ID: "SUBCAT007",
            NAME: "Machine Learning",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: "SUBCAT008",
            NAME: "Data Analysis",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: "SUBCAT009",
            NAME: "Deep Learning",
            STATUS: true,
          },
        ],
        STATUS: true,
      },
      {
        CATEGORY_ID: "CAT004",
        NAME: "Design",
        SUB_CATEGORIES: [
          {
            SUB_CATEGORY_ID: "SUBCAT010",
            NAME: "UI/UX Design",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: "SUBCAT011",
            NAME: "Graphic Design",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: "SUBCAT012",
            NAME: "Web Design",
            STATUS: true,
          },
        ],
        STATUS: true,
      },
      {
        CATEGORY_ID: "CAT005",
        NAME: "Business",
        SUB_CATEGORIES: [
          {
            SUB_CATEGORY_ID: "SUBCAT013",
            NAME: "Marketing",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: "SUBCAT014",
            NAME: "Management",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: "SUBCAT015",
            NAME: "Entrepreneurship",
            STATUS: true,
          },
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
