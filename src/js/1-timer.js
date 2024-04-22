import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let userSelectedDate;
let intervalID;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.disabled = true;
      iziToast.show({ message: 'Please choose a date in the future' });
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(dateInput, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function timerDisplay({ days, hours, minutes, seconds }) {
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onStartClick() {
  startBtn.disabled = true;
  dateInput.disabled = true;

  intervalID = setInterval(() => {
    const currentTime = new Date().getTime();
    const remainingTime = userSelectedDate - currentTime;

    if (remainingTime <= 0) {
      clearInterval(intervalID);
      startBtn.disabled = false;
      dateInput.disabled = false;
      timerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.show({ message: 'Timer has ended' });
    } else {
      const timeObj = convertMs(remainingTime);
      timerDisplay(timeObj);
    }
  }, 1000);
}

startBtn.addEventListener('click', onStartClick);
