//Функция, возвращающая случайное число
function getRandomInRange(minNumber, maxNumber) {
  if (minNumber >= 0 && maxNumber > minNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }
  return console.error('invalid input value');
}

getRandomInRange(1, 10);

//Функция, возвращающая случайное число с плавающей точкой
function getRandomСoord(minNumber, maxNumber, numOfDecimalPlaces) {
  if (minNumber >= 0 && maxNumber > minNumber) {
    return (Math.random() * (maxNumber - minNumber) + minNumber).toFixed(numOfDecimalPlaces);
  }
  return console.error('invalid input value');
}

getRandomСoord(1.3, 1.5, 4);

const TITLES = [
  'Замки',
  'Особняки',
  'Рёканы',
  'Юрты',
  'Земляные дома',
  'Уютная квартира в центре'
];

const DESCRIPTION = [
  'Лес, виноградники и Рейн приглашают вас прогуляться',
  'Барбекю на террасе',
  'Тихое и уютное место',
  'С выходом к морю',
  'Райское место для единения с природой',
  'Уютная квартира с видом на город'
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

let currentIndex = 0;
const getImagePath = () => {
  currentIndex++;
  const numImage = (currentIndex.toString()).padStart(2, '0');
  return `img/avatars/user${ numImage }.png`;

};

const getRandomArrayFeatures = (array) => {
  const numElements = getRandomInRange(0, array.length - 1);
  return array.slice(0, numElements);
};

const getRandomArrayElement = (array) => array[getRandomInRange(0, array.length - 1)];

const OFFER_COUNT = 10;

const createOffer = () => {
  const locationLat = getRandomСoord(35.65000, 35.70000, 5);
  const locationLng = getRandomСoord(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: getImagePath(),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      adress: `${locationLat} ${locationLng}`,
      price: getRandomInRange(1, 100000),
      rooms: getRandomInRange(1, 12),
      guests: getRandomInRange(1, 22) ,
      description: getRandomArrayElement(DESCRIPTION),
      type: getRandomArrayElement(TYPE),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomArrayFeatures(FEATURES),
      photos: getRandomArrayElement(PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const createOffers = Array.from({length: OFFER_COUNT}, createOffer);
createOffers();
