//Функция, возвращающая случайное число
function getRandomInRange(minNumber, maxNumber) {
  if (minNumber >= 0 && maxNumber > minNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }
  return 'invalid input value';
}

getRandomInRange(1, 10);

//Функция, возвращающая случайное число с плавающей точкой
function getRandomСoord(minNumber, maxNumber, numOfDecimalPlaces) {
  if (minNumber >= 0 && maxNumber > minNumber) {
    return (Math.random() * (maxNumber - minNumber) + minNumber).toFixed(numOfDecimalPlaces);
  }
  return 'invalid input value';
}

getRandomСoord(1.3, 1.5, 4);

export {
  getRandomСoord,
  getRandomInRange
};
