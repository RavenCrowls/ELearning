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
        CATEGORY_ID: generateCategoryId(),
        NAME: "Web Development",
        SUB_CATEGORIES: [
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "Frontend Development",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "Backend Development",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "Full Stack Development",
            STATUS: true,
          },
        ],
        STATUS: true,
      },
      {
        CATEGORY_ID: generateCategoryId(),
        NAME: "Mobile Development",
        SUB_CATEGORIES: [
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "iOS Development",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "Android Development",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "React Native",
            STATUS: true,
          },
        ],
        STATUS: true,
      },
      {
        CATEGORY_ID: generateCategoryId(),
        NAME: "Data Science",
        SUB_CATEGORIES: [
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "Machine Learning",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "Data Analysis",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "Deep Learning",
            STATUS: true,
          },
        ],
        STATUS: true,
      },
      {
        CATEGORY_ID: generateCategoryId(),
        NAME: "Design",
        SUB_CATEGORIES: [
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "UI/UX Design",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "Graphic Design",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "Web Design",
            STATUS: true,
          },
        ],
        STATUS: true,
      },
      {
        CATEGORY_ID: generateCategoryId(),
        NAME: "Business",
        SUB_CATEGORIES: [
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "Marketing",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
            NAME: "Management",
            STATUS: true,
          },
          {
            SUB_CATEGORY_ID: generateSubCategoryId(),
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
