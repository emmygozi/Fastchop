
const basePath = 'api/v1';
const signupForm = document.getElementById('signupForm');

const signup = (e) => {
  e.preventDefault(e);
  const getFormName = document.forms.signupForm;
  const password = getFormName.passSignup.value;
  const name = getFormName.mynameSignup.value;
  const email = getFormName.emailSignup.value;
  const address = getFormName.address.value;
  const phone = getFormName.phone.value;
  const showNotification = document.getElementById('notifyUser');


  let headers = new Headers();
  fetch('./auth/signup', {
      method: "POST",
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, address, phone }),

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
        localStorage.role = result.role;
         showNotification.style.background = '#32c5d2';
         showNotification.style.display = 'block';
         showNotification.innerHTML = 'Account creation successful';
        setTimeout(() => {
          window.location.replace('home');
        }, 5000);
      }
    })
    .catch(err => console.log(err));
};

signupForm.addEventListener('submit', signup, false);
