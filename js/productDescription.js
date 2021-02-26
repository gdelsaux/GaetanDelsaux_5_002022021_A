const cameraName = document.getElementById('camera--name');
const cameraDescription = document.getElementById('camera--description');
const cameraPrice = document.getElementById('camera--price');
const cameraLenses = document.getElementById('custom--choice');
const cameraPicture = document.getElementById('camera--picture');

//get camera details from Local Storage
let getDetails = localStorage.getItem("cameraDetails");
let cameraDetails = JSON.parse(getDetails);

cameraName.innerHTML = cameraDetails.name;
cameraDescription.innerHTML = cameraDetails.description;
cameraPrice.innerHTML = cameraDetails.price;
cameraPicture.setAttribute('src', cameraDetails.photo);

//Loop to create choice of lenses
for (let i = 0; i < cameraDetails.lense.length; i++) {
    const options =
        `<option name="${cameraDetails.lense[i]}">${cameraDetails.lense[i]}</option>`
    cameraLenses.insertAdjacentHTML('beforeend', options)
}

//Send item to Local Storage for the cart
const addToCart = document.getElementById('add-to-cart');
console.log(addToCart)
const itemQuantity = document.querySelector('input')
console.log(itemQuantity.value)
const small = document.querySelector('small')
console.log(small)
const lense = document.querySelector('select')
console.log(lense.value)

addToCart.addEventListener('click', () => {
   if (itemQuantity.value === '' || lense.value == 'Select') {
    small.classList.remove('hidden')
   } else {
    small.classList.add('hidden')
    

    //Set accuate data to send
    let cardDetail = {
        "lense": ["33mm", "50mm", "105mm"],
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "name": "Nikomn",
        "price": "5000",
        "photo": "./../images/vcam_1.jpg",
        "quantity": "2"
      };
      console.log(cardDetail)
      let detailString = JSON.stringify(cardDetail);
      console.log(detailString)
    
      localStorage.setItem("cart", detailString)
   }
})