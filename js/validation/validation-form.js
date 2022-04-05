import { sendData } from '../api.js';
import { form } from '../page-activation/inactivated-page.js';
import { resetMap } from '../map/map.js';
import { sliderElement } from '../slider-price.js';


const offerForm = document.querySelector('.ad-form');
const offerTitle = offerForm.querySelector('#title');
const offerPrice = offerForm.querySelector('#price');
const resetButton = document.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element-invalid',
  successTextClass: 'ad-form__element-valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const PRICE_MAX = 100000;
const PRICE_MIN = 0;


const titleLength = (value) => value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE;
const priceMaxValue = (number) => number <= PRICE_MAX;
const priceMinValue = (number) => number > PRICE_MIN;

const titleLengthError = `От ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов`;
const priceMaxError = `Максимальная стоимость не может превышать ${PRICE_MAX}`;
const priceMinError = `Минимальная стоимость должна быть больше ${PRICE_MIN}`;

pristine.addValidator(offerTitle, titleLength, titleLengthError);
pristine.addValidator(offerPrice, priceMaxValue, priceMaxError);
pristine.addValidator(offerPrice, priceMinValue, priceMinError);

const offerRoomNumber = offerForm.querySelector('#room_number');
const offerCapacity = offerForm.querySelector('#capacity');

const selectRooms = offerForm.querySelector('[name="rooms"]');
const selectCapacity = offerForm.querySelector('[name="capacity"]');
const roomsOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const validateRoomsOptions = () => roomsOptions[selectRooms.value].includes(selectCapacity.value);

const getDeliveryErrorMessage = () => (selectRooms.value === '100' || selectCapacity.value === '0')
  ? '100 комнат не для гостей'
  : 'количество комнат не должно превышать количество гостей';

pristine.addValidator(offerRoomNumber, validateRoomsOptions, getDeliveryErrorMessage);
pristine.addValidator(offerCapacity, validateRoomsOptions, getDeliveryErrorMessage);


const resetForms = () => {
  mapFilters.reset();
  offerForm.reset();

  sliderElement.noUiSlider.updateOptions({
    start: 5000,
  });
  pristine.reset();
  resetMap();
};


const setOfferFormSubmit = (onSuccess, onFail, resetForm) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        () => onSuccess(),
        () => onFail(),
        new FormData(evt.target),
        () => resetForm(),
      );
    }
  });
};


resetButton.addEventListener('click', () => {
  resetForms();
});

export { setOfferFormSubmit, resetForms };