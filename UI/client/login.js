
const basePath = 'api/v1';
const loginForm = document.getElementById('myLoginForm');

const login = (e) => {
  e.preventDefault(e);
  const getFormName = document.forms.myLoginForm;
  const password = getFormName.pass2.value;
  const email = getFormName.email2.value;
  const showNotification = document.getElementById('notifyUserLogin');


  let headers = new Headers();
  fetch('./auth/login', {
      method: "POST",
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password}),

  })
  .then(response => response.json())
  .then((result) => {
    if (result.state !== 'Succesful') {
      showNotification.style.display = 'block';
      showNotification.style.background = 'red';
      showNotification.innerHTML = result.message;
      setInterval(() => {
        showNotification.style.display = 'none';
      }, 2000);
    } else {
      localStorage.token = result.token;
      localStorage.id = result.id;
       showNotification.style.background = '#32c5d2';
       showNotification.style.display = 'block';
       showNotification.innerHTML = 'Login successful';
      setTimeout(() => {
        window.location.replace('home');
      }, 5000);
    }
  })
  .catch(err => console.log(err));
};

loginForm.addEventListener('submit', login, false);
