import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    getCheckDate(selectedDates[0]);
  },
};

startBtn.disabled = true;

input.addEventListener('focus', onInputClick);

function onInputClick() {
  flatpickr('[type="text"]', options);
}

function getCheckDate(selectedDate) {
  if (Date.parse(selectedDate) < options.defaultDate.getTime()) {
    Notify.failure('Please choose a date in the future');
  } else {
    startBtn.disabled = false;
    onStartTimer(selectedDate);
  }
}

function onStartTimer(sd) {
  startBtn.addEventListener('click', () => {
    setInterval(() => {
      startBtn.disabled = true;
      input.disabled = true;
      let ms = Date.parse(sd) - Date.now();
      let results = convertMs(ms);
      daysEl.textContent = addLeadingZero(results.days);
      hoursEl.textContent = addLeadingZero(results.hours);
      minutesEl.textContent = addLeadingZero(results.minutes);
      secondsEl.textContent = addLeadingZero(results.seconds);
    }, 1000);
  });
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
