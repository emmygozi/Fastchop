
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


  alert(password )
  let headers = new Headers();
  fetch('./auth/signup', {
      method: "POST",
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, address, phone }),

  })
    .then(response => response)
    .then((result) => {
        console.log(result);
        console.log(result.headers.get('x-auth-token'));
      if (result.status !== 201) {
        showNotification.style.display = 'block';
        showNotification.style.background = 'red';
        showNotification.innerHTML = 'Please input correct values for all fields';
        setInterval(() => {
          showNotification.style.display = 'none';
        }, 2000);
      } else {
        localStorage.token = result.headers.get('x-auth-token');
         console.log(localStorage.token + 'YAAAAY');
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