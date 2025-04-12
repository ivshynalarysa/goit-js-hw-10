// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";


// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const inputDate = document.querySelector('#datetime-picker')
const btnStart = document.querySelector('[data-start]')
const DateDay = document.querySelector('[data-days]')
const DateHours = document.querySelector('[data-hours]')
const DateMinutes = document.querySelector('[data-minutes]')
const DateSeconds = document.querySelector('[data-seconds]')

let timerId = null
let selectedDate = null


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if(selectedDates[0] < new Date()){
          return iziToast.error({
              position:"topRight",
              message: "Please choose a date in the future"
          })
      }
      selectedDate = selectedDates[0]
      btnStart.removeAttribute('disabled')
  },
};
  
 btnStart.addEventListener(`click`, createTime)

 flatpickr(inputDate, options)

 function createTime() {

  timerId = setInterval(updateTimer, 1000)
  btnStart.setAttribute('disabled', true)
  inputDate.setAttribute('disabled', true)
  

 }

 function updateTimer()
 {
  const time = selectedDate - new Date()
  const { days, hours, minutes, seconds } = convertMs(time)
  DateDay.textContent = addLeadingZero(days)
  DateHours.textContent = addLeadingZero(hours)
  DateMinutes.textContent = addLeadingZero(minutes)
  DateSeconds.textContent = addLeadingZero(seconds)
  if(time < 1000){
      clearInterval(timerId)
      inputDate.removeAttribute('disabled')
  }


 }

 function addLeadingZero(value){
  return String(value).padStart(2, 0)
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
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
  