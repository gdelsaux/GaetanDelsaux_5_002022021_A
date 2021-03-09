//Get elements from the DOM
const cartItem = document.getElementById('cart--items');

// Get data from api to create products cards
fetch('http://localhost:3000/api/cameras')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      const injectedHtml = document.getElementById('camera--cards')
      const html = `
        <div class="col-12 col-md-5 col-lg-4 mb-5 card--product">
          <div class="card shadow-lg">
            <div class="card-body" onclick="product('${data[i]._id}')">
              <img src="${data[i].imageUrl}" alt="${data[i].name} camera" class="card-img-top">
              <h5 class="card-title p-2">${data[i].name}</h5>
              <p class="card-title yo">$${data[i].price}</p>
              <p class="hidden">${data[i].description}</p>
              <p class="hidden">${data[i]._id}</p>
              <p class="hidden">${data[i].lenses}</p>
              <a href="./html/product.html"
              class="btn bg-transparent border-dark rounded-pill mt-4 stretched-link">See product
              details</a>
            </div>
          </div>
        </div>
      `;
      injectedHtml.insertAdjacentHTML('afterbegin', html);
      //console.log(data)
    };
  });

//Get data from Local Storage
function getLocalStorage(){
  let itemsInCart = localStorage.getItem('cart');
  let numberOfItem = JSON.parse(itemsInCart);
  console.log(numberOfItem.length)
  if (numberOfItem.length > 0) {
    //display the number of item in the cart in the nav bar
    document.getElementById('basket').classList.add('active');
    cartItem.innerHTML = numberOfItem.length;
  };
};
getLocalStorage();


//Send data to Local Storage to be displayed in the product detail page
function product(ID) {
  let itemId = JSON.stringify(ID);
  console.log(itemId);
  localStorage.setItem("cameraDetails", itemId);
};

