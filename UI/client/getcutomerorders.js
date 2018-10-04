
const getACustomerOrders = (e) => {
    e.preventDefault();
  
    const notify = document.getElementById('notifyACustomer');
    const customerName = document.getElementById('customersName');
    const id = localStorage.id;
  
  
    fetch(`./users/${id}/orders`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-auth-token': localStorage.token
      },
    })
      .then(res => res.json()
        .then((data) => {
            console.log(data);
          let menus = document.getElementById('myCustomerOrders').innerHTML;
          if (res.status === 401 || res.status === 400) {
            notify.style.background = 'rgb(106, 197, 106)';
            notify.style.display = 'block';
            notify.innerHTML = 'Error loading page';
            setTimeout(() => {
              //window.location.replace('login');
            }, 2000);
          }
          if (res.status === 200) {
              customerName.style.textTransform = 'capitalize';
              customerName.innerHTML =  data.user.name + ' Orders';
            data.yourOrder.forEach((aOrder) => {

                const addDate = new Date(aOrder.dateadded);
              menus += `
              <div class="card">
                    <div class="inside-card">
                      <h4><b>${aOrder.name}</b></h4> 
                      <em>₦${aOrder.price}</em>
                      <p>Quantity Ordered:  &nbsp; ${aOrder.quantity}</p>
                      <p>${addDate}</p>
                        <div class="flex-container shift-flex-container">
                                <div class="center-flex-child" onclick="myFunction()">
                                        Order Information
                                </div>
                              </div>
                              <div id="mysnackbar"> Here is a list of all your orders ${data.user.name}</div>
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
          document.getElementById('myCustomerOrders').innerHTML = menus;
        })
        .catch(err => console.error(err)));
  };
  
  
  
  window.onload = getACustomerOrders;
  