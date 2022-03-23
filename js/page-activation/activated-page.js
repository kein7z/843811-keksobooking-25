import {form, formElements, mapFilters, mapElements} from './inactivated-page.js';
const activatedPage = () => {
  form.classList.remove('ad-form--disabled');
  formElements.forEach((element) => element.removeAttribute('disabled', ''));
  mapFilters.classList.remove('map__filters--disabled');
  mapElements.forEach((element) => element.removeAttribute('disabled', ''));
};
export {activatedPage};
