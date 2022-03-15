import { createOffers } from './create-offers.js';

const offers = createOffers(1);
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');

const TYPES_MAP = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель'
};

offers.forEach((offer) => {
  const newOffer = popupTemplate.cloneNode(true);

  newOffer.querySelector('.popup__avatar').src = offer.author.avatar;
  newOffer.querySelector('.popup__title').textContent = offer.offer.title;
  newOffer.querySelector('.popup__text--address').textContent = offer.offer.adress;
  newOffer.querySelector('.popup__text--address').textContent = offer.offer.adress;
  newOffer.querySelector('.popup__text--price').innerHTML = `${offer.offer.price} <span>₽/ночь</span>`;
  newOffer.querySelector('.popup__type').textContent = TYPES_MAP[offer.offer.type];
  newOffer.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  newOffer.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  newOffer.querySelector('.popup__description').textContent = offer.offer.description;
  newOffer.querySelector('.popup__photo').src = offer.offer.photos;

  const modifieres = offer.offer.features.map((modFeatures) => `popup__feature--${modFeatures}`);
  newOffer.querySelectorAll('.popup__feature').forEach((feature) => {
    if (!modifieres.includes(feature.classList[1])) {
      feature.remove();
    }
  });

  mapCanvas.append(newOffer);
});
