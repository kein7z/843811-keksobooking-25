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

const titleLength = (value) => value.length >= 30 && value.length <= 100;
const priceMaxValue = (number) => number <= 100000;
const priceMinValue = (number) => number > 0;

pristine.addValidator(offerTitle, titleLength, 'От 30 до 100 символов');
pristine.addValidator(offerPrice, priceMaxValue, 'Максимальная стоимость не может превышать 100 000');
pristine.addValidator(offerPrice, priceMinValue, 'Минимальная стоимость должна быть больше 0');


offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {offerForm, pristine};
