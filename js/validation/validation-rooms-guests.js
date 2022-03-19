import {offerForm, pristine} from './validation-price-title.js';
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

const getDeliveryErrorMessage = () =>(selectRooms.value === '100' || selectCapacity.value === '0')
  ? '100 комнат не для гостей'
  : 'количество комнат не должно превышать количество гостей';

pristine.addValidator(offerRoomNumber, validateRoomsOptions, getDeliveryErrorMessage);
pristine.addValidator(offerCapacity, validateRoomsOptions, getDeliveryErrorMessage);

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
