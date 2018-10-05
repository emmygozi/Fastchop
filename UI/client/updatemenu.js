const baseUrl = '../api/v1';

function getOneMeal(e) {
  e.preventDefault();
  const lastpart = location.href.substring(0, location.href.lastIndexOf("/")+4)

  const id = lastpart.split("/").pop();

  fetch(`../menu/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json())
      .then((data) => {
        const name2 = document.getElementById('food2');
        const description2 = document.getElementById('description2');
        const imageurl2 = document.getElementById('imageurl2');
        const price2 = document.getElementById('price2');

          name2.value = data.retrievedMenu.name;
          description2.value = data.retrievedMenu.description;
          imageurl2.value = data.retrievedMenu.imageurl;
          price2.value = data.retrievedMenu.price;
      })
      .catch(err => console.error(err));
}

window.onload = getOneMeal;


const updateEntry = (e) => {
  e.preventDefault();
  const lastpart = location.href.substring(0, location.href.lastIndexOf("/")+4)

  const id = lastpart.split("/").pop();

  const form = document.forms.editmenu;
  const name = form.food2.value;
  const imageurl = form.imageurl2.value;
  const description = form.description2.value;
  const price = form.price2.value;

  const notify = document.getElementById('notifyUpdate');
  
  fetch(`../menu/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name, imageurl, description,
      price
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json())
      .then((data) => {

        if (data.message !== 'Updated specified menu') {
          notify.style.display = 'block';
          notify.style.background = 'hotpink';
          notify.innerHTML = data.message;
          setInterval(() => {
            notify.style.display = 'none';
          }, 2000);
        } else {
          notify.style.background = 'purple';
          notify.style.display = 'block';
          notify.innerHTML = 'Entry updated successfully';
          setTimeout(() => {
            window.location.replace('../admin-dashboard');
          }, 2000);
        }
      })
      .catch(err => console.error(err));
};

document.getElementById('editmenu').addEventListener('submit', updateEntry);
