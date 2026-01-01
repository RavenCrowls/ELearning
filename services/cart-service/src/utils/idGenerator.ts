// ID Generator Utilities for consistent prefixed IDs

export const generateCartId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `CART${timestamp}${random}`;
};

export const generateEnrollmentId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ENR${timestamp}${random}`;
};
