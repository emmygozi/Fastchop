

function getOneOrder(e) {
    e.preventDefault();
    const lastpart = location.href.substring(0, location.href.lastIndexOf("/")+4)
  
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
          const processName = document.getElementById('completeName');
          const statusName = document.getElementById('completeStatus');
  
            processName.value = data.anOrder.name;
            statusName.value = data.anOrder.description;
        })
        .catch(err => console.error(err));
  }
  
  window.onload = getOneOrder;


const editForm = document.getElementById('completeForm');

const orderEdited = (e) => {
    const lastpart = location.href.substring(0, location.href.lastIndexOf("/")+4)
  
    const id = lastpart.split("/").pop();

  e.preventDefault(e);
  const getFormName = document.forms.completeForm;
  let status = getFormName.completeValue.value;

  status = 'Complete';

  console.log(status);
  const showNotification = document.getElementById('completeNameNotification');


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
      showNotification.style.background = 'hotpink';
      showNotification.innerHTML = result.message;
      setInterval(() => {
        showNotification.style.display = 'none';
      }, 2000);
    } else {
       showNotification.style.background = 'purple';
       showNotification.style.display = 'block';
       showNotification.innerHTML = result.message;
      setTimeout(() => {
        location.href = 'all-orders';
      }, 5000);
    }
  })
  .catch(err => console.log(err));
};

editForm.addEventListener('submit', orderEdited, false);
