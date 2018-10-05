

function getOneMeal(e) {
  e.preventDefault();
  const lastpart = location.href.substring(0, location.href.lastIndexOf("/")+4)

  const id = lastpart.split("/").pop();

  console.log(id);
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
        const name = document.getElementById('menuName');
        const priceId = document.getElementById('priceId');
        const menuId = document.getElementById('menuId');



          name.value = data.retrievedMenu.name;
          menuId.value = data.retrievedMenu.id;
          priceId.value = data.retrievedMenu.price;
      })
      .catch(err => console.error(err));
}

window.onload = getOneMeal;


const postOrder = (e) => {
  e.preventDefault();

  const lastpart = location.href.substring(0, location.href.lastIndexOf("/")+4)

  const id = lastpart.split("/").pop();

  const menuid = id.split("?").pop();
  console.log(menuid)
  

 const form = document.forms.orderForm;
 const quantity = form.quantityValue.value;
 console.log(quantity)

  

  const notify = document.getElementById('notifyOrder');
  
  fetch('../orders', {
    method: 'POST',
    body: JSON.stringify({
      menuid, quantity
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json())
      .then((data) => {

        console.log(data);
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

document.getElementById('orderForm').addEventListener('submit', postOrder);
