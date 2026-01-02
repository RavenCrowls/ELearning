// ID Generator Utilities for consistent prefixed IDs

export const generateCategoryId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `CAT${timestamp}${random}`;
};

export const generateSubCategoryId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `SC${timestamp}${random}`;
};
