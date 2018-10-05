
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
          const name = document.getElementById('deleteMenuName');
          const price = document.getElementById('deletePrice');
          const description = document.getElementById('deleteDescription');
  
            name.value = data.retrievedMenu.name;
            price.value = data.retrievedMenu.description;
            description.value = data.retrievedMenu.description;
        })
        .catch(err => console.error(err));
  }
  
  window.onload = getOneMeal;


function deleteMenu(e) {
  e.preventDefault();
  const lastpart = location.href.substring(0, location.href.lastIndexOf("/")+4)

  const id = lastpart.split("/").pop();

  fetch(`../menu/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json()
      .then((data) => {
        const notify = document.getElementById('notifyAdminDelete');

        if (res.status === 401 || res.status === 400) {
          notify.style.background = 'hotpink';
          notify.style.display = 'block';
          notify.innerHTML = data.message;
          setTimeout(() => {
            window.location.replace('../login');
          }, 2000);
        }
        if (res.status === 200) {
          notify.style.background = 'purple';
          notify.style.display = 'block';
          notify.innerHTML = 'Entry deleted successfully';
          setTimeout(() => {
            window.location.replace('../admin-dashboard');
          }, 2000);
        }
        if (res.status === 404) {
          notify.style.background = 'hotpink';
          notify.style.display = 'block';
          notify.innerHTML = 'Entry does not exist';
          setTimeout(() => {
            window.location.replace('../home');
          }, 2000);
        }
      })
      .catch(err => console.error(err)));
}

document.getElementById('deleteButtonMenu').addEventListener('click', deleteMenu);
