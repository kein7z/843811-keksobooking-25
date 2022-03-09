import { getRandomInRange } from './rundom-number.js';

const getRandomArrayFeatures = (array) => {
  const numElements = getRandomInRange(0, array.length - 1);
  return array.slice(0, numElements);
};

export { getRandomArrayFeatures };
