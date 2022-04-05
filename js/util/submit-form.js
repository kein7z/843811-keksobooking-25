import { resetForms } from '../validation/validation-form.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const createSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);

  const closeMessage = (check) => {
    successMessage.remove();
    if (check) {
      resetForms();
    }
  };

  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape'){
      closeMessage(true);
    }
  });

  document.addEventListener('click', () => {
    closeMessage(true);
  });
};

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const createErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);

  const closeMessage = () => {
    errorMessage.remove();
  };

  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    closeMessage();
  });

  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape'){
      closeMessage();
    }
  });

  document.addEventListener('click', () => {
    closeMessage();
  });
};


export {createSuccessMessage, createErrorMessage};
