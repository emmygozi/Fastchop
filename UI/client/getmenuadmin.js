
const getMenuAdmin = (e) => {
  e.preventDefault();

  const notify = document.getElementById('notifyAdmin');
  const addManageOrders = document.getElementById('addManageOrders');


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
        let menus = document.getElementById('alladminmenu').innerHTML;
        if (res.status === 401 || res.status === 400) {
          notify.style.background = 'rgb(106, 197, 106)';
          notify.style.display = 'block';
          notify.innerHTML = 'Error loading page';
          setTimeout(() => {
            window.location.replace('login');
          }, 2000);
        }
        if (res.status === 200) {
          if (localStorage.role === 'admin'){
            addManageOrders.innerHTML = '<a href="all-orders">Manage Orders</a>';

          }
          data.menus.forEach((aMenu) => {
            let convertedDate = new Date(aMenu.dateadded);
            menus += `
            <div class="card">
                    <div class="inside-card">
                      <h4 ><b>${aMenu.name}</b></h4> 
                      <em>${convertedDate}</em>
                      <p>${aMenu.description}</p> 
                      <div class="flex-container shift-flex-container">
                            <div class="center-flex-child">
                                    <!-- Trigger/Open The Modal -->
                                    <form action="update-menu/${aMenu.id}" style="display: inline">
                                    <button>Edit <i class="far fa-edit"></i></button>
                                    </form>
                            </div>
    
                            <div class="center-flex-child">
                            <form action="delete-menu/${aMenu.id}" style="display: inline">
                               <button id="myDelete"> Delete <i class="fas fa-trash"></i></button>
                               </form>
                            </div>
                      </div>
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
        document.getElementById('alladminmenu').innerHTML = menus;
      })
      .catch(err => console.error(err)));
};



window.onload = getMenuAdmin;
