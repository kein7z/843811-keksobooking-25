import {
  TITLES,
  DESCRIPTIONS,
  TYPE,
  CHECKIN,
  CHECKOUT,
  FEATURES,
  PHOTOS
} from './data.js';
import { getImagePath } from './create-image-path.js';
import { getRandomArrayFeatures } from './create-array-features.js';
import { getRandomArrayElement } from './random-array-element.js';
import { getRandomСoord, getRandomInRange } from './rundom-number.js';

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
      guests: getRandomInRange(1, 22),
      description: getRandomArrayElement(DESCRIPTIONS),
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

const createOffers = (count = 10) => Array.from({ length: count}, createOffer);

export {
  createOffers
};
