let formData = { email: "", message: "" };
const localStorageKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

// Завантаження даних із LocalStorage під час завантаження сторінки
function commonValues() {
    if (!localStorage.getItem(localStorageKey)) return;
    const data = loadFromLs(localStorageKey);
    if (data) {
      form.elements.email.value = data.email || '';
      form.elements.message.value = data.message || '';
    }
  }
  
  commonValues();
  



// Обробка події input для збереження даних у LocalStorage

form.addEventListener('input', event => {
    formData.email = form.elements.email.value;
    formData.message = form.elements.message.value;
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  });

// Обробка події submit
form.addEventListener('submit', event=> {
    event.preventDefault(); 
    if (
      event.target.elements.email.value === '' ||
      event.target.elements.message.value === ''
    ) {
      alert('Please fill in all fields.');
      return;
    }
  
    console.log(formData);

     // Очищення даних після успішної відправки
  form.reset()
  localStorage.removeItem(localStorageKey);
});


  // Функція для завантаження даних із LocalStorage
function loadFromLs(key) {
    const data = localStorage.getItem(key);
    try {
      return JSON.parse(data);
    } catch (err) {
      console.error('Error parsing data from localStorage:', err);
      return null;
    }
  }
  
