import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
let promises = [];

form.addEventListener('submit', onFormSabmit);

function onFormSabmit(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;
  getPromisesArray(amount.value);
  getCreatePromises(delay.value, step.value);
  e.currentTarget.reset();
  promises = [];
}

function getPromisesArray(amount) {
  for (i = 1; i <= amount; i += 1) {
    promises.push(i);
  }
}

function getCreatePromises(delay, step) {
  promises.map(el => {
    const stepDelay = Number(delay) + (el - 1) * Number(step);
    createPromise(el, stepDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  });
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
