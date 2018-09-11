/* eslint-disable */
function hamburger() {
    let element = document.getElementsByTagName('span');
    let homebtn = document.getElementById('myhome');
    let rigthelements = document.getElementsByClassName('right');

    let i;
    for (i = 0; i < element.length; i++) {
        element[i].onclick = function () {

            if (homebtn.style.display === "none") {
                homebtn.style.display = "block";
            } else {
                homebtn.style.display = "none";
            }

            if (rigthelements[0].style.display === "none") {
                rigthelements[0].style.display = "block";
            } else {
                rigthelements[0].style.display = "none";
            }

            element.classList.toggle('open');

        }
    }



}