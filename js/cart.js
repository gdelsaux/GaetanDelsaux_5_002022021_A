// Get element from the DOM
const finalAmount = document.getElementById('final--amount');
const quantity = document.querySelector('#item--quantity');
const price = document.getElementById('item--price');
const subtotal = document.getElementById('subtotal');
const orderForm = document.getElementById('order--form');
const submitFormButton = document.getElementById('submit--form')
const cameraName = document.getElementById('camera--name')

//Data from Local Storage
let getDetails = localStorage.getItem("cart");
let cart = JSON.parse(getDetails);

//Display cart items from Local Storage
cameraName.innerHTML = cart.name;
price.innerHTML = cart.price;
quantity.value = cart.quantity;
subtotal.textContent = quantity.value * price.innerHTML
finalAmount.innerHTML = subtotal.innerHTML



//Prices display
quantity.addEventListener('input', ($event) => {
    console.log(quantity.value);
    subtotal.textContent = quantity.value * price.innerHTML
});

//Form validation
for (let i = 0; i < (orderForm.length - 1); i++) {
    orderForm.children[i].addEventListener('blur', ($event) => {
        if (orderForm.children[i].value == ''){
            orderForm.children[i].classList.add('border', 'border-danger')

        } else {
            orderForm.children[i].classList.add('border', 'border-success')
        }
    });
};

//submitFormButton.addEventListener