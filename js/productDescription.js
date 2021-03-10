//Get elements from the DOM
const cameraName = document.getElementById('camera--name');
const cameraDescription = document.getElementById('camera--description');
const cameraPrice = document.getElementById('camera--price');
const cameraLenses = document.getElementById('custom--choice');
const cameraPicture = document.getElementById('camera--picture');
const cameraId = document.getElementById('camera--id');
const addToCart = document.getElementById('add-to-cart');
const itemQuantity = document.querySelector('input');
const small = document.querySelector('small');
const lense = document.querySelector('select');
const cartItem = document.getElementById('cart--items');

//Get data from the API/Local storage with matching ID
let getDetails = localStorage.getItem("cameraDetails");
let cameraDetails = JSON.parse(getDetails);
fetch('http://localhost:3000/api/cameras')
    .then(response => response.json())
    .then(data => {
        let item = data.filter(function (id) {
            return id._id == cameraDetails;
        });
        item.forEach(element => {
            cameraId.textContent = element._id
            cameraName.textContent = element.name;
            cameraDescription.textContent = element.description;
            cameraPrice.textContent = element.price;
            //new Intl.NumberFormat('en-US', {
                //style: 'currency',
                //currency: 'USD',
                //minimumFractionDigits: 2,  
            //}).format(element.price);
            cameraPicture.setAttribute('src', element.imageUrl);
            element.lenses.forEach(lens => {
                const options = `<option name="${lens}">${lens}</option>`;
                cameraLenses.insertAdjacentHTML('beforeend', options)
            })
        });
    });

//Get data from cart in Local Storage
function getLocalStorage() {
    let itemsInCart = localStorage.getItem('cart');
    let cart = JSON.parse(itemsInCart);
    if (itemsInCart) {
        cartItem.innerHTML = cart.length;
        document.getElementById('basket').classList.add("active")
    };
};
getLocalStorage();

//Send item to Local Storage for the cart
addToCart.addEventListener('click', () => {
    //check if Qty and lens have been selected
    if (lense.value == 'Select') {
        small.classList.remove('hidden')
        //remove the text asking to select a lense if one has been selected
        lense.addEventListener('change', ($event => {
            if (lense.value !== 'Select') {
                small.classList.add('hidden');
            }
        }));
    } else {
        let cartArray = [];
        small.classList.add('hidden');
        let cardDetail = {
            id: cameraId.textContent,
            camera: cameraName.textContent,
            lens: cameraLenses.value,
            quantity: itemQuantity.value,
            price: cameraPrice.textContent,
            img: cameraPicture.getAttribute('src'),
        };
        //check if the cart exist in Local storage
        if (localStorage.getItem('cart')) {
            let itemsInCart = localStorage.getItem('cart');
            let cart = JSON.parse(itemsInCart);
            const searchCarItems = cart.find(item =>
                cardDetail.id == item.id && cardDetail.lens === item.lens
            );
            //check if there is a matching camera with the lens selected in the cart
            if (!searchCarItems) {
                cart.push(cardDetail);
                localStorage.setItem('cart', JSON.stringify(cart));
                document.getElementById('cart--message').classList.remove('text-danger');
                document.getElementById('cart--message').classList.add('text-succes');
                document.getElementById('cart--message').innerHTML = 'Item added to cart';
                setTimeout(function () {
                    document.getElementById('cart--message').innerHTML = '';
                }, 2000);
                getLocalStorage();
            } else {
                document.getElementById('cart--message').classList.add('text-danger')
                document.getElementById('cart--message').innerHTML = 'Item item already in the cart';
                setTimeout(function () {
                    document.getElementById('cart--message').innerHTML = '';
                }, 2000);
                getLocalStorage();
            }
        } else {
            cartArray.push(cardDetail);
            localStorage.setItem('cart', JSON.stringify(cartArray));
            getLocalStorage();
        };
    };
});