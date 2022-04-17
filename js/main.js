import './popup.js';
import './validation/validation-form.js';
import './page-activation/inactivated-page.js';
import './map/map.js';
import './slider-price.js';
import { renderOffers } from './map/map.js';
import { getData } from './api.js';
import { filtersOffers } from './filters.js';
const OFFER_COUNT = 10;

getData((offers) => {
  renderOffers(offers.slice(0, OFFER_COUNT));
  filtersOffers(() => renderOffers(offers));
});

export { OFFER_COUNT };
