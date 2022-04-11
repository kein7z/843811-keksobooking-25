import { debounce } from './util.js';

const filterForm = document.querySelector('.map__filters');
const typeHouse = filterForm.querySelector('#housing-type');
const countRooms = filterForm.querySelector('#housing-rooms');
const countGuests = filterForm.querySelector('#housing-guests');
const housingFeatures = filterForm.querySelector('#housing-features');
const featureElements = Array.from(housingFeatures.querySelectorAll('input'));
const priceHouse = filterForm.querySelector('#housing-price');

const DELAY_FILTER = 500;

const Prices = {
  low: {
    MIN: 0,
    MAX: 10000,
  },
  middle: {
    MIN: 10000,
    MAX: 50000,
  },
  high: {
    MIN: 50000,
    MAX: 100000,
  },
};

const filtersPrice = (offer) => {
  const priceHouseValue = priceHouse.value;
  if (priceHouseValue === 'any') {
    return true;
  }
  return offer.offer.price > Prices[priceHouseValue].MIN && offer.offer.price < Prices[priceHouseValue].MAX;
};

const filtersFeatures = (offers) => {
  const { features } = offers.offer;
  const checkedFeatures = featureElements
    .filter((feature) => feature.checked)
    .map((feature) => feature.value);
  return checkedFeatures.every(
    (checkedFeature) => features && features.includes(checkedFeature)
  );
};

const getSimilarOffers = (offer) => {
  const { type, rooms, guests } = offer.offer;

  if (
    (type === typeHouse.value || typeHouse.value === 'any')
    &&
    (rooms === +countRooms.value || countRooms.value === 'any')
    &&
    (guests === +countGuests.value || countGuests.value === 'any')
    &&
    (filtersFeatures(offer))
    &&
    (filtersPrice(offer))
  ) {
    return true;
  }
};

const filtresOffers = (cb) => {
  filterForm.addEventListener('change', debounce(() => {
    cb();
  }, DELAY_FILTER));
};

export { getSimilarOffers, filtresOffers };
