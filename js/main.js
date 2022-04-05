import './popup.js';
import './validation/validation-form.js';
import './page-activation/inactivated-page.js';
import './map/map.js';
import './slider-price.js';
import {renderOffers} from './map/map.js';
import {setOfferFormSubmit} from './validation/validation-form.js';
import { getData } from './api.js';
import {createSuccessMessage} from './util/submit-form.js';
import {createErrorMessage} from './util/submit-form.js';
import { resetForms } from './validation/validation-form.js';
const OFFER_COUNT = 10;

getData((offers) => {
  renderOffers(offers.slice(0, OFFER_COUNT));
});


setOfferFormSubmit(createSuccessMessage, createErrorMessage, resetForms);
