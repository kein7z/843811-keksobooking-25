import { onRemoveMessage } from './validation/validation-form.js';
import { showAlert, disableFormFilters } from './util.js';

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showAlert('Ошибка загрузки данных');
      disableFormFilters();
    });
};

const sendData = (createSuccessMessage, createErrorMessage, formData) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        createSuccessMessage(onRemoveMessage);
      } else {
        createErrorMessage(onRemoveMessage);
      }
    })
    .catch(() => {
      createErrorMessage(onRemoveMessage);

    });
};

export { getData, sendData };
