const id = document.getElementById('order--id');

let getId = localStorage.getItem('orderId');
let idOfOrder = JSON.parse(getId);
console.log(idOfOrder)
id.innerText = idOfOrder.orderId;

localStorage.clear();