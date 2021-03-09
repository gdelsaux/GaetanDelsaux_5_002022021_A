// Get element from the DOM
const cartTable = document.getElementById('cart--table');
const cartItem = document.getElementById('cart--items');
const orderForm = document.getElementById('order--form');
const finalAmount = document.getElementById('final--amount');

//Data from Local Storage
function getLocalStorage() {
    let itemsInCart = localStorage.getItem('cart');
    let cart = JSON.parse(itemsInCart);
    if (itemsInCart) {
        cartItem.innerHTML = cart.length;
        document.getElementById('basket').setAttribute('class', 'active')
        cart.forEach(element => {
            //create cells for the table
            let tableRow = document.createElement('tr');
            let infoCell = document.createElement('td');
            let img = document.createElement('img');
            let name = document.createElement('span');
            let price = document.createElement('td');
            let lens = document.createElement('td');
            let quantity = document.createElement('td');
            let quantityChange = document.createElement('input');
            let deleteItem = document.createElement('span');

            //insert data from local storage into each cell created
            name.innerHTML = element.camera;
            img.setAttribute('src', element.img);
            img.style.width = '80px'
            infoCell.append(img, name);
            
            quantity.setAttribute('class', 'text-center');
            quantity.append(quantityChange, deleteItem);
            price.innerHTML = '$ ' + element.price;
            lens.innerHTML = element.lens;

            //how to set multiple attributes?
            quantityChange.value = element.quantity;
            quantityChange.setAttribute('type', 'number');
            quantityChange.setAttribute('min', '1');
            quantityChange.setAttribute('class', 'text-center');
            quantityChange.setAttribute('class', "w-25");
            quantityChange.setAttribute('onclick', 'updateCartQuantity()');
            deleteItem.innerHTML = `<button onclick="removeItemFromCart('${element.id}', '${element.lens}')" class="rounded-pill ml-3"><i class="far fa-trash-alt"></i></button>`;
            //subtotal.innerHTML = '$ ' + quantityChange.value * parseInt(element.price);
            tableRow.append(infoCell, price, lens, quantity);  
            cartTable.appendChild(tableRow);
        });
    } else if (itemsInCart === null) {
        emptyBasket();
    };
};
getLocalStorage();





//Remove item from cart array in local storage and reset cart icon in the nav bar
function removeItemFromCart(id, lens) {
    let itemsInCart = localStorage.getItem('cart');
    let cart = JSON.parse(itemsInCart);
    const searchCartIndex = cart.findIndex(element =>
        element.id === id && element.lens === lens
    );
    //cart.splice(searchCartIndex, 1);
    //localStorage.setItem('cart', JSON.stringify(cart));
    cartItem.innerHTML = cart.length;
    if (cart.length === 0) {
        localStorage.removeItem('cart');
        emptyBasket();
        cartItem.remove();
    };
};

//Display in case the cart is empty
function emptyBasket() {
    cartTable.remove();
    const emptyBasket = `
        <div id="empty--basket" class="d-flex flex-column align-items-center">
            <h3>Your basket is empty!</h3>
            
            <button class="rounded-pill border mt-3 bg-light shadow">
                <a href="./../index.html" class="text-dark">Let's shop</a>                
            </button>              
            <img src="./../images/emptyBasket.png" alt="empty shopping cart" class="mt-3">
        </div>
        `;
    document.getElementById('basket--content').insertAdjacentHTML('beforeend', emptyBasket)
};

//Form validation
for (let i = 0; i < (orderForm.length - 1); i++) {
    orderForm.children[i].addEventListener('blur', ($event) => {
        if (orderForm.children[i].value === '') {
            orderForm.children[i].classList.add('border', 'border-danger')
            orderForm.children[i].setAttribute('placeholder', 'Please enter details')

        } else {
            orderForm.children[i].classList.remove('boder', 'border-danger')
            orderForm.children[i].classList.add('border', 'border-success')
        }
    });
};