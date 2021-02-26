// Get data from api to create products cards
fetch('http://localhost:3000/api/cameras')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++){
      const injectedHtml = document.getElementById('camera--cards')
      const html = `
        <div class="col-12 col-md-5 col-lg-4 mb-5 card--product">
          <div class="card shadow-lg">
            <div class="card-body" onclick="product()">
              <img src="${data[i].imageUrl}" alt="${data[i].name} camera" class="card-img-top">
              <h5 class="card-title p-2">${data[i].name}</h5>
              <p class="card-title yo">$${data[i].price}</p>
              <p class="hidden">${data[i].description}</p>
              <p class="hidden">${data[i]._id}</p>
              <p class="hidden">${data[i].lenses}</p>
              
            </div>
          </div>
        </div>
      `;
      injectedHtml.insertAdjacentHTML('afterbegin', html);
      //let getDetails = localStorage.getItem("cameraDetails");
      //let cameraDetails = JSON.parse(getDetails);
    };
    console.log(data)
  });


//dummy card for testing
const testCard = `
<div class="col-12 col-md-5 col-lg-4 mb-5 card--product">
  <div class="card shadow-lg">
    <div class="card-body" onclick="product()">
      <img src="./../images/vcam_1.jpg" alt="camera" class="card-img-top">
      <p id="yo" class="card-title p-2">nikon<p>
      <p class="card-title">76</p>
      <p class="hidden">description</p>
      <p class="hidden">8708708708</p>
      <p class="hidden">lense</p>
      <a href="./html/product.html" class="stretched-link card-title">See details</a>
    </div>
  </div>
</div>
`;

const test = document.getElementById('test');
test.innerHTML = testCard;


function product() {
  let cardDetail = {
    "lense": ["33mm", "50mm", "105mm"],
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "name": "Nikomn",
    "price": "5000",
    "photo": "./../images/vcam_1.jpg"
  };
  console.log(cardDetail)
  let detailString = JSON.stringify(cardDetail);
  console.log(detailString)

  localStorage.setItem("cameraDetails", detailString)
}

