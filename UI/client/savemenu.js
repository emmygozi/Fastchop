/**  Post new  food
    * @param {string} name
    * @param {string} description
    * @param {string} imageurl
    * @param {string} price
    * @return {string} error message
    * @public
   */

const loginForm = document.getElementById('addMenu');

const menuAdded = (e) => {
  e.preventDefault(e);
  const getFormName = document.forms.addMenu;
  const name = getFormName.food.value;
  const description = getFormName.description.value;
  const imageurl = getFormName.imageurl.value;
  const price = getFormName.price.value;
  const showNotification = document.getElementById('notifyAdminForMenu');
  let span2 = document.getElementsByClassName("closed")[0];


  let headers = new Headers();
  fetch('./menu', {
      method: "POST",
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-auth-token': localStorage.token
      },
      body: JSON.stringify({ name, description, imageurl, price }),

  })
  .then(response => response.json())
  .then((result) => {
    if (result.state !== 'Succesful') {
      showNotification.style.display = 'block';
      showNotification.style.background = 'purple';
      showNotification.innerHTML = result.message;
      setInterval(() => {
        showNotification.style.display = 'none';
      }, 2000);
    } else {
       showNotification.style.background = 'purple';
       showNotification.style.display = 'block';
       showNotification.innerHTML = 'Saved menu sucessfully';
      setTimeout(() => {
        window.location.replace('home');
      }, 5000);
    }
  })
  .catch(err => console.log(err));
};

loginForm.addEventListener('submit', menuAdded, false);
