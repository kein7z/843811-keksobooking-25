const form = document.querySelector('.ad-form');
const formElements = Array.from(form.children);
const mapFilters = document.querySelector('.map__filters');
const mapElements = Array.from(mapFilters.children);

const inactivatedPage = () => {
  form.classList.add('ad-form--disabled');
  formElements.forEach((element) => element.setAttribute('disabled', ''));
  mapFilters.classList.add('map__filters--disabled');
  mapElements.forEach((element) => element.setAttribute('disabled', ''));
};

inactivatedPage();
export {form, formElements, mapFilters, mapElements, inactivatedPage};
