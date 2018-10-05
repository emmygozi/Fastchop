
const editForm = document.getElementById('editmenu');

const menuEdited = (e) => {
  e.preventDefault(e);
  const getFormName = document.forms.editmenu;
  const name = getFormName.food2.value;
  const description = getFormName.description2.value;
  const imageurl = getFormName.imageurl2.value;
  const price = getFormName.price2.value;
  const showNotification = document.getElementById('notifyAdminForMenu');
  let span2 = document.getElementsByClassName("closed")[0];


  let headers = new Headers();
  fetch('./menu', {
      method: "PUT",
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
      showNotification.style.background = 'hotpink';
      showNotification.innerHTML = result.message;
      setInterval(() => {
        showNotification.style.display = 'none';
      }, 2000);
    } else {
       showNotification.style.background = 'purple';
       showNotification.style.display = 'block';
       showNotification.innerHTML = 'Saved edited sucessfully';
      setTimeout(() => {
        location.reload();
      }, 5000);
    }
  })
  .catch(err => console.log(err));
};

editForm.addEventListener('submit', menuEdited, false);
