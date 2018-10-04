

function getOneOrder(e) {
    e.preventDefault();
    const lastpart = location.href.substring(0, location.href.lastIndexOf("/")+3)
  
    const id = lastpart.split("/").pop();

    fetch(`../orders/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-auth-token': localStorage.token
      },
    })
      .then(res => res.json())
        .then((data) => {
            console.log(data);
          const processName = document.getElementById('processName');
          const statusName = document.getElementById('processStatus');
  
            processName.value = data.retrievedMenu.name;
            statusName.value = data.retrievedMenu.description;
        })
        .catch(err => console.error(err));
  }
  
  window.onload = getOneOrder;


const editForm = document.getElementById('processForm');

const orderEdited = (e) => {
    const lastpart = location.href.substring(0, location.href.lastIndexOf("/")+3)
  
    const id = lastpart.split("/").pop();

  e.preventDefault(e);
  const getFormName = document.forms.processForm;
  const status = getFormName.processValue.value;


  let headers = new Headers();
  fetch(`../orders/${id}`, {
      method: "PUT",
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-auth-token': localStorage.token
      },
      body: JSON.stringify({ status }),

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
       showNotification.style.background = '#32c5d2';
       showNotification.style.display = 'block';
       showNotification.innerHTML = 'Saved menu sucessfully';
      setTimeout(() => {
        location.reload();
      }, 5000);
    }
  })
  .catch(err => console.log(err));
};

editForm.addEventListener('submit', orderEdited, false);
