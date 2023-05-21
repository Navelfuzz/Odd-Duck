'use strict';

/**Globals */
let votingRounds = 15;
let prodArray = [];

/** DOM */
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultBtn = document.getElementById('show-results-btn');

// Canvas Element
let ctx = document.getElementById('myChart');

// Constructor
function Product(name, imageExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0;
}

/** Utilities/Helpers */

// Rand Num Gen
function getRandomNumber() {
  return Math.floor(Math.random() * prodArray.length);
}

// Image Render/view&vote log
let previousIndices = [];

function renderImgs() {
  let indices = [];

  while (indices.length < 3) {
    let newIndex = getRandomNumber(prodArray.length);
    if (!previousIndices.includes(newIndex) && !indices.includes(newIndex)) {
      indices.push(newIndex);
    }
  }

  previousIndices = indices;

  imgOne.src = prodArray[indices[0]].image;
  imgOne.title = prodArray[indices[0]].name;

  imgTwo.src = prodArray[indices[1]].image;
  imgTwo.title = prodArray[indices[1]].name;

  imgThree.src = prodArray[indices[2]].image;
  imgThree.title = prodArray[indices[2]].name;

  prodArray[indices[0]].views++;
  prodArray[indices[1]].views++;
  prodArray[indices[2]].views++;
}

// Results Chart Render
function renderChart() {
  let productNames = [];
  let productViews = [];
  let productVotes = [];

  for(let i = 0; i < prodArray.length; i++){
    productNames.push(prodArray[i].name);
    productViews.push(prodArray[i].views);
    productVotes.push(prodArray[i].votes);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews, // array that will hold the views
        borderWidth: 5,
        backgroundColor: 'pink',
        borderColor: 'pink'
      },
      {
        label: '# of Votes',
        data: productVotes, // array that will hold the # of votes
        borderWidth: 5,
        backgroundColor: 'black',
        borderColor: 'black'
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(ctx, chartObj);
}

/** Event Handlers */
function clickProduct(event){
  let imageClicked = event.target.title;

  for(let i = 0; i < prodArray.length; i++){
    if(imageClicked === prodArray[i].name){
      prodArray[i].votes++;
      votingRounds--;
      renderImgs();
    }
  }

  if(votingRounds === 0){
    imgContainer.removeEventListener('click', clickProduct);
    // Local Storage Starting Point //
    let stringifiedProducts = JSON.stringify(prodArray);
    console.log('Stringified Products >>>> ', stringifiedProducts);

    // Store to local
    localStorage.setItem('myProducts', stringifiedProducts);
  }
}

function handleRenderChart(){
  if (votingRounds === 0){
    renderChart();
  }
  resultBtn.removeEventListener('click', handleRenderChart);
}

/** Executables */

// Local Storage wrap up
let retrievedProducts = localStorage.getItem('myProducts');
console.log('Products from Local Storage >>>> ', retrievedProducts);

let parsedProducts = JSON.parse(retrievedProducts);
console.log('Parsed Products >>>> ', parsedProducts);

/** Rebuilding Products using the Constructor */
if(retrievedProducts){
  for(let i = 0; i < parsedProducts.length; i++){
    if(parsedProducts[i].name === 'sweep'){
      let reconstructedSweep = new Product(parsedProducts[i].name, 'png');
      reconstructedSweep.views = parsedProducts[i].views;
      reconstructedSweep.votes = parsedProducts[i].votes;
      prodArray.push(reconstructedSweep);
    } else {
      let reconstructedProduct = new Product(parsedProducts[i].name);
      reconstructedProduct.views = parsedProducts[i].views;
      reconstructedProduct.votes = parsedProducts[i].votes;
      prodArray.push(reconstructedProduct);
    }
  }
} else {
  let sweep = new Product('sweep', 'png');
  let bag = new Product('bag');
  let banana = new Product('banana');
  let bathroom = new Product('bathroom');
  let boots = new Product('boots');
  let breakfast = new Product('breakfast');
  let bubblegum = new Product('bubblegum');
  let chair = new Product('chair');
  let cthulhu = new Product('cthulhu');
  let dogDuck = new Product('dog-duck');
  let dragon = new Product('dragon');
  let pen = new Product('pen');
  let petSweep = new Product('pet-sweep');
  let scissors = new Product('scissors');
  let shark = new Product('shark');
  let tauntaun = new Product('tauntaun');
  let unicorn = new Product('unicorn');
  let waterCan = new Product('water-can');
  let wineGlass = new Product('wine-glass');
  
  prodArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, sweep, scissors, shark, tauntaun, unicorn, waterCan, wineGlass);
}

renderImgs();

imgContainer.addEventListener('click', clickProduct);
resultBtn.addEventListener('click', handleRenderChart);
