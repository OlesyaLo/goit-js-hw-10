// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', OnSubmit);

function OnSubmit(event) {
  event.preventDefault();

  const ms = event.currentTarget.elements.delay.value;
  const stateStatus = event.currentTarget.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateStatus === 'fulfilled') {
        resolve(ms);
      } else {
        reject(ms);
      }
    }, ms);
  });

  promise
    .then(ms => {
      showNotification(`✅ Fulfilled promise in ${ms} ms`, '#59a10d', '#fff');
    })
    .catch(ms => {
      showNotification(`❌ Rejected promise in ${ms} ms`, '#ef4040', '#fff');
    });
}

function showNotification(message, backgroundColor, messageColor) {
  iziToast.show({
    message: message,
    backgroundColor: backgroundColor,
    messageColor: messageColor,
  });
}
