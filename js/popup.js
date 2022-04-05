const TYPES_MAP = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель'
};
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const createCustomPopup = (offer) => {
  const newOffer = popupTemplate.cloneNode(true);
  const { title, adress, price, type, rooms, guests, checkin, checkout, description, photos, features } = offer.offer;

  newOffer.querySelector('.popup__avatar').src = offer.author.avatar;
  newOffer.querySelector('.popup__title').textContent = title;
  newOffer.querySelector('.popup__text--address').textContent = adress;
  newOffer.querySelector('.popup__text--price').innerHTML = `${price} <span>₽/ночь</span>`;
  newOffer.querySelector('.popup__type').textContent = TYPES_MAP[type];
  newOffer.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  newOffer.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  newOffer.querySelector('.popup__description').textContent = description;

  if (features !== undefined) {
    const modifieres = features.map((modFeatures) => `popup__feature--${modFeatures}`);
    newOffer.querySelectorAll('.popup__feature').forEach((feature) => {
      if (!modifieres.includes(feature.classList[1])) {
        feature.remove();
      }
    });
  }

  if (photos !== undefined) {
    const templatePhotosForm = newOffer.querySelector('.popup__photos');
    const templatePhotosTag = templatePhotosForm.querySelector('img');
    const cloneImage = templatePhotosTag.cloneNode(true);
    templatePhotosTag.remove();

    for (let i = 0; i < photos.length; i++) {
      const newImg = cloneImage.cloneNode(true);
      newImg.src = photos[i];
      templatePhotosForm.appendChild(newImg);
    }
  } else {
    newOffer.querySelector('.popup__photo').remove();
  }
  return newOffer;
};

export { createCustomPopup };
