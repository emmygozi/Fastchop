
console.log(localStorage.token);
const getOrdersAdmin = (e) => {
  e.preventDefault();

  const notify = document.getElementById('notifyAdmin');

  console.log(localStorage.token);


  fetch('./orders', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json()
      .then((data) => {
        let order = document.getElementById('ordersHomePlace').innerHTML;
        if (res.status === 401 || res.status === 400) {
          notify.style.background = 'rgb(106, 197, 106)';
          notify.style.display = 'block';
          notify.innerHTML = 'Error loading page';
          setTimeout(() => {
            window.location.replace('login');
          }, 2000);
        }
        if (res.status === 200) {
            console.log(data);
          data.allOrders.forEach((aOrder) => {
              console.log(aOrder);

              if (aOrder.status === 'Processing'){
                order += `
                <div class="card">
                        <div class="inside-card">
                          <h4 ><b>${aOrder.name}</b></h4> 
                          <em>${aOrder.dateadded}</em>
                          <p>Order status:${aOrder.status}</>
                          <div class="flex-container shift-flex-container">
                                <div class="center-flex-child">
                                        <!-- Trigger/Open The Modal -->
                                        <form action="complete/${aOrder.id}">
                                        <button id="myBtnTwo">Mark as Complete <i class="fas fa-check"></i></button>
                                        </form>
                                </div>
        
                          </div>
                        </div>
                </div>
    
    
                `

              }else{

            order += `
            <div class="card">
                    <div class="inside-card">
                      <h4 ><b>${aOrder.name}</b></h4> 
                      <em>${aOrder.dateadded}</em>
                      <p>Order status:${aOrder.status}</>
                      <div class="flex-container shift-flex-container">
                            <div class="center-flex-child">
                                    <!-- Trigger/Open The Modal -->
                                    <form action="processing/${aOrder.id}">
                                    <button id="myBtnTwo">Accept order <i class="fas fa-check"></i></button>
                                    </form>
                            </div>
    
                            <div class="center-flex-child">
                            <form action="decline/${aOrder.id}">
                               <button id="myDeleteTwo"> Decline order <i class="fas fa-trash"></i></button>
                               </form>
                            </div>
                      </div>
                    </div>
            </div>


            `; }
          });
        }
        if (res.status === 404) {
          notify.style.display = 'block';
          notify.style.background = 'hotpink';
          notify.innerHTML = 'You do not have a menu yet';
        }
        document.getElementById('ordersHomePlace').innerHTML = order;
      })
      .catch(err => console.error(err)));
};



window.onload = getOrdersAdmin;
