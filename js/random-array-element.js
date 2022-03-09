import { getRandomInRange } from './rundom-number.js';
const getRandomArrayElement = (array) => array[getRandomInRange(0, array.length - 1)];

export { getRandomArrayElement };
