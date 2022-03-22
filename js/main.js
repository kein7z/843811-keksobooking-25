import { createOffers } from './create-offers.js';
import './popup.js';
import './validation/validation-rooms-guests.js';
import './validation/validation-price-title.js';
import './page-activation/inactivated-page.js';
import { inactivatedPage } from './page-activation/inactivated-page.js';

createOffers();
inactivatedPage();
