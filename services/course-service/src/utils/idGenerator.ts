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

export const generateCourseId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `COURSE${timestamp}${random}`;
};

export const generateLectureId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `LEC${timestamp}${random}`;
};

export const generateVideoId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `VID${timestamp}${random}`;
};

export const generateEnrollmentId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ENR${timestamp}${random}`;
};

export const generatePublishmentId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `PUB${timestamp}${random}`;
};

export const generateCommentId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `CMT${timestamp}${random}`;
};

export const generateRatingId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `RAT${timestamp}${random}`;
};

export const generateCartId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `CART${timestamp}${random}`;
};

export const generateRoleId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `R${timestamp}${random}`;
};
