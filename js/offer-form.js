const offerForm = document.querySelector('.ad-form');
const offerTitle = offerForm.querySelector('#title');
const offerPrice = offerForm.querySelector('#price');
const offerRoomNumber = offerForm.querySelector('#room_number');
const offerCapacity = offerForm.querySelector('#capacity');

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element-invalid',
  successTextClass: 'ad-form__element-valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const selectRooms = offerForm.querySelector('[name="rooms"]');
const selectCapacity = offerForm.querySelector('[name="capacity"]');
const roomsOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const validateRoomsOptions = () => roomsOptions[selectRooms.value].includes(selectCapacity.value);

const titleLength = (value) => value.length >= 30 && value.length <= 100;
const priceMaxValue = (number) => number <= 100000;
const priceMinValue = (number) => number > 0;

pristine.addValidator(offerTitle, titleLength, 'От 30 до 100 символов');
pristine.addValidator(offerPrice, priceMaxValue, 'Максимальная стоимость не может превышать 100 000');
pristine.addValidator(offerPrice, priceMinValue, 'Минимальная стоимость должна быть больше 0');
pristine.addValidator(offerRoomNumber, validateRoomsOptions, 'Количество гостей не должно превышать количество комнат');
pristine.addValidator(offerCapacity, validateRoomsOptions, 'Количество гостей не должно превышать количество комнат');

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
