// Get element from the DOM
const cartTable = document.getElementById('cart--table');
const cartItem = document.getElementById('cart--items');
const orderForm = document.getElementById('order--form');
const finalAmount = document.getElementById('final--amount');

//Data from Local Storage
function getLocalStorage() {
    let itemsInCart = localStorage.getItem('cart');
    let cart = JSON.parse(itemsInCart);
    let quantityArray = [];
    if (itemsInCart) {
        cartItem.innerHTML = cart.length;
        document.getElementById('basket').setAttribute('class', 'active')
        cart.forEach(element => {
            //create data for the table
            let tableRow = document.createElement('tr');
            let infoCell = document.createElement('td');
            let img = document.createElement('img');
            let name = document.createElement('span');
            let price = document.createElement('td');
            let lens = document.createElement('td');
            let quantity = document.createElement('td');
            let quantityChange = document.createElement('span');
            let deleteItem = document.createElement('span');

            //insert data from local storage into each cell created
            infoCell.classList.add('text-left')
            name.innerHTML = element.camera;
            name.classList.add('ml-0', 'text-nowrap');

            img.setAttribute('src', element.img);
            img.style.border = 'solid 1px black';
            img.style.width = '80px';

            infoCell.append(img, name);

            quantityChange.innerHTML = `<input type="number" class="mt-3 rounded-pill text-center item--quantity" placeholder="1" value="${element.quantity}" min="1"  onclick="updateCartQuantity('${element.id}', '${element.lens}')">`;
            quantity.setAttribute('class', 'text-center');
            deleteItem.innerHTML = `<button onclick="removeItemFromCart('${element.id}', '${element.lens}')" class="rounded-pill ml-sm-2"><i class="far fa-trash-alt"></i></button>`;
            quantity.append(quantityChange, deleteItem);

            price.innerHTML = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
            }).format(element.price);

            lens.innerHTML = element.lens;

            tableRow.append(infoCell, price, lens, quantity);
            cartTable.appendChild(tableRow);

            //Display the amount of items in the cart
            element.quantity = parseInt(element.quantity)
            quantityArray.push(element.quantity);
            let quantityArrayReduced = quantityArray.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            });
            cartItem.innerHTML = quantityArrayReduced;
            document.getElementById('basket').classList.add("active");
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
    cartTable.removeChild(cartTable.childNodes[searchCartIndex + 1])
    cart.splice(searchCartIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartItem.innerHTML = cart.length;
    if (cart.length === 0) {
        localStorage.removeItem('cart');
        emptyBasket();
        cartItem.remove();
    };
    if (itemsInCart) {
        let quantityArray = [];
        cart.forEach(item => {
            item.quantity = parseInt(item.quantity)
            quantityArray.push(item.quantity);
            let quantityArrayReduced = quantityArray.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            });
            cartItem.innerHTML = quantityArrayReduced;
            document.getElementById('basket').classList.add("active");
        });
    };
    reduce();
};

//Display in case the cart is empty
function emptyBasket() {
    cartTable.remove();
    document.getElementById('basket--total').remove();
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

/*Update item quantity in the cart
 * Get the relevent object fron the cart in Local Storage
 * Set the Qty to the value selected
 * Replace the object in the cart array
 * Update the basket amount
 */
function updateCartQuantity(id, lens) {
    let itemsInCart = localStorage.getItem('cart');
    let cart = JSON.parse(itemsInCart);
    const searchCartIndex = cart.findIndex(element =>
        element.id === id && element.lens === lens
    );
    cart[searchCartIndex].quantity = event.target.value;
    cart.splice(searchCartIndex, 1, cart[searchCartIndex]);
    localStorage.setItem('cart', JSON.stringify(cart));
    reduce();
    if (itemsInCart) {
        let quantityArray = [];
        cart.forEach(item => {
            item.quantity = parseInt(item.quantity)
            quantityArray.push(item.quantity);
            let quantityArrayReduced = quantityArray.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            });
            cartItem.innerHTML = quantityArrayReduced;
            document.getElementById('basket').classList.add("active");
        });
    };
};

//Function to reduce the quantityArray and priceArray
function reduce() {
    let itemsInCart = localStorage.getItem('cart');
    let cart = JSON.parse(itemsInCart);
    let priceArray = [];
    cart.forEach(element => {
        let price = element.quantity * element.price;
        console.log(price)
        priceArray.push(price)
        console.log(priceArray)
        let priceArrayReduced = priceArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });
        console.log(priceArrayReduced);
        finalAmount.innerText = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(priceArrayReduced);
    })

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
reduce();

//Submit the form send data to API
document.getElementById('submit--form').addEventListener('click', ($event) => {
    $event.preventDefault();
    if (document.getElementById('firstName').value == '' || document.getElementById('lastName').value == '' || document.getElementById('address').value == '' || document.getElementById('city').value == '' || document.getElementById('email').value == '') {
        document.getElementById('submit--form').setAttribute('dissabled', 'true');
        document.getElementById('error').classList.remove('hidden');
        setTimeout(function () {
            document.getElementById('error').classList.add('hidden');
        }, 2000);
    } else {
        document.getElementById('submit--form').removeAttribute('dissabled');
        let contact = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value,
        };
        let products = [];
        let itemsInCart = localStorage.getItem('cart');
        let cart = JSON.parse(itemsInCart);
        cart.forEach(id => {
            products.push(id.id)
        });
        let data = {
            contact,
            products
        };
        fetch('http://localhost:3000/api/cameras/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(response => response.json())
            .then(data => {
                localStorage.clear();
                localStorage.setItem('orderId', JSON.stringify(data))
                location.href = './confirmation.html'
            });
    }

})