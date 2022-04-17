const ALERT_SHOW_TIME = 5000;
const error = document.querySelector('body');
const formFilter = document.querySelector('.map__filters');
const formFilterElements = Array.from(formFilter.children);

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const disableFormFilters = () => {
  formFilterElements.forEach((element) => {
    element.setAttribute('disabled', '');
  });
};

const showAlert = (message) => {
  const alertError = document.createElement('div');
  alertError.style.zIndex = '100';
  alertError.style.position = 'absolute';
  alertError.style.left = '0';
  alertError.style.top = '0';
  alertError.style.right = '0';
  alertError.style.padding = '10px 3px';
  alertError.style.fontSize = '30px';
  alertError.style.textAlign = 'center';
  alertError.style.backgroundColor = 'black';
  alertError.style.color = 'red';

  alertError.textContent = message;

  error.append(alertError);
  setTimeout(() => {
    alertError.remove();
  }, ALERT_SHOW_TIME);
};

export { debounce, showAlert, disableFormFilters };
