export const generateUniqueTransactionId = () => {
  return Math.random().toString(36).substr(2);
};
