
const basePath = 'api/v1';
const signupForm = document.getElementById('signupForm');

const signup = (e) => {
  e.preventDefault(e);
  const getFormName = document.forms.signupForm;
  const password = getFormName.passSignup.value;
  const name = getFormName.mynameSignup.value;
  const email = getFormName.emailSignup.value;

  alert(name )
  let headers = new Headers();
  fetch(`/auth/signup`, {
      method: "POST",
      headers: {
              
      },
      body: JSON.stringify({ name, email, password }),

  })
    .then(response => response.json())
    .then((result) => {
        console.log(result.headers.get('x-auth-token'));
      if (result.status === 'successful') {
        localStorage.token = result.headers.get('x-auth-token');
        console.log(localStorage.token);
        setTimeout(() => {
          window.location.replace('index');
        }, 5000);
      } else {
        console.log('Wrong entry please retry');
      }
    })
    .catch(err => console.log(err));
};

signupForm.addEventListener('submit', signup, false);