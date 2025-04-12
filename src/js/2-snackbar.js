// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form')

form.addEventListener('submit', onFormSubmit)

function onFormSubmit(event){
    event.preventDefault()
    const {delay, state} = event.currentTarget.elements
    createPromise(delay.value, state.value)
    .then(data => iziToast.success({position: "topRight", message: `✅ Fulfilled promise in ${data}ms`}))
    .catch(data => iziToast.error({position: "topRight", message: `❌ Rejected promise in ${data}ms`}))
    form.reset()
}

function createPromise(delay, state){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (state === 'fulfilled') {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
      });
}




