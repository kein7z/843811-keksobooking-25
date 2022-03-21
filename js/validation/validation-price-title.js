const offerForm = document.querySelector('.ad-form');
const offerTitle = offerForm.querySelector('#title');
const offerPrice = offerForm.querySelector('#price');


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


offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {offerForm, pristine};
