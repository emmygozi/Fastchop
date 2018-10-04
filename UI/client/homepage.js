
const getMenuAdmin = (e) => {
  e.preventDefault();

  const notify = document.getElementById('notifyHome');


  fetch('./menu', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json()
      .then((data) => {
        let menus = document.getElementById('sectionGroup').innerHTML;
        if (res.status === 401 || res.status === 400) {
          notify.style.background = 'rgb(106, 197, 106)';
          notify.style.display = 'block';
          notify.innerHTML = 'Error loading page';
          setTimeout(() => {
            window.location.replace('login');
          }, 2000);
        }
        if (res.status === 200) {
          data.menus.forEach((aMenu) => {
              console.log(aMenu.name);
            menus += `
            <div class="grid_1_of_4 images_1_of_4">
                <a href="customer-order-history.html"><img src="${aMenu.imageurl}" alt=""></a>
                <div class="mobileOptimized">
                <h2>${aMenu.name}</h2>
                <p>
                    <form action="add-quantity/${aMenu.id}">
                        <button class="buttongreen" type="submit">Order</button>
                    </form>
                    <span class="price">₦${aMenu.price}</span>
                </p>
                </div>
      </div>
            `;
          });
        }
        if (res.status === 404) {
          notify.style.display = 'block';
          notify.style.background = 'hotpink';
          notify.innerHTML = 'You do not have a menu yet';
        }
        document.getElementById('sectionGroup').innerHTML = menus;
      })
      .catch(err => console.error(err)));
};



window.onload = getMenuAdmin;
