import { sendData } from '../api.js';
import { form } from '../page-activation/inactivated-page.js';
import { resetMap, renderOffers } from '../map/map.js';
import { sliderElement } from '../slider-price.js';
import { resetImg } from '../photo.js';
import { getData } from '../api.js';
import { filtersOffers } from '../filters.js';
import { OFFER_COUNT } from '../main.js';

const offerForm = document.querySelector('.ad-form');
const offerTitle = offerForm.querySelector('#title');
const offerPrice = offerForm.querySelector('#price');
const resetButton = document.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const offerRoomNumber = offerForm.querySelector('#room_number');
const offerCapacity = offerForm.querySelector('#capacity');
const buttonSubmit = document.querySelector('.ad-form__submit');
const offerTypeHouse = document.querySelector('#type');
const offerTimeIn = document.querySelector('#timein');
const offerTimeOut = document.querySelector('#timeout');

const RoomsOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const MinPricePerNight = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const PRICE_MAX = 100000;
const DEFAULT_PRICE = 5000;

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element-invalid',
  successTextClass: 'ad-form__element-valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

offerTypeHouse.addEventListener('change', () => {
  offerPrice.placeholder = MinPricePerNight[offerTypeHouse.value];
});

const checkUpTitleLength = (value) => value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE;
const checkUpPriceMaxValue = (number) => number <= PRICE_MAX;
const checkUpPriceMinValue = (number) =>  number >= MinPricePerNight[offerTypeHouse.value];
const titleLengthError = `От ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов`;
const priceMaxError = `Максимальная стоимость не может превышать ${PRICE_MAX}`;
const priceMinError = () => `Минимальная стоимость должна быть больше ${MinPricePerNight[offerTypeHouse.value]}`;

pristine.addValidator(offerTitle, checkUpTitleLength, titleLengthError);
pristine.addValidator(offerPrice, checkUpPriceMaxValue, priceMaxError);
pristine.addValidator(offerPrice, checkUpPriceMinValue, priceMinError);

const validateRoomsOptions = () => RoomsOptions[offerRoomNumber.value].includes(offerCapacity.value);

const getDeliveryErrorMessage = () => (offerRoomNumber.value === '100' || offerCapacity.value === '0')
  ? '100 комнат не для гостей'
  : 'количество комнат не должно превышать количество гостей';

pristine.addValidator(offerRoomNumber, validateRoomsOptions, getDeliveryErrorMessage);
pristine.addValidator(offerCapacity, validateRoomsOptions, getDeliveryErrorMessage);

offerTimeIn.addEventListener('change', () => {
  offerTimeOut.value = offerTimeIn.value;
});
offerTimeOut.addEventListener('change', () => {
  offerTimeIn.value = offerTimeOut.value;
});

offerPrice.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    start: offerPrice.value,
  });
});

const resetForm = () => {
  mapFilters.reset();
  offerForm.reset();
  sliderElement.noUiSlider.updateOptions({
    start: DEFAULT_PRICE,
  });
  pristine.reset();
  resetImg();
  offerPrice.value = DEFAULT_PRICE;
  resetMap();
  getData((offers) => {
    renderOffers(offers.slice(0, OFFER_COUNT));
    filtersOffers(() => renderOffers(offers));
  });
};

const blockButtonSubmit = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.classList.add('ad-form--disabled');
};

const unblockButtonSubmit = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.classList.remove('ad-form--disabled');
};

const createSuccessMessage = (messageRemove) => {
  unblockButtonSubmit();
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);
  messageRemove(successMessage);
  resetForm();
};

const createErrorMessage = (messageRemove) => {
  unblockButtonSubmit();
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);
  messageRemove(errorMessage);
};

const onRemoveMessage = (closeMessage) => {

  const removeMessege = (closeMessages) => {

    closeMessages.remove();
    document.removeEventListener('keydown', onRemoveMessage);
  };

  closeMessage.addEventListener('click', () => {
    removeMessege(closeMessage);
  });
  const button = closeMessage.querySelector('button');
  if (button !== null) {
    button.addEventListener('click', () => {
      removeMessege(closeMessage);
    });
  }
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeMessege(closeMessage);
    }
  });
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockButtonSubmit();
    const formData = new FormData(evt.target);
    sendData(createSuccessMessage, createErrorMessage, formData);
  }
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export { onRemoveMessage };
