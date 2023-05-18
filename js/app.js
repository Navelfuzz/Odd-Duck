'use strict';

/** Global Variables */
let productContainer = document.querySelector('section');         //
let resultButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let clicks = 0;
let maxClicks = 25;

// Container for the objects:
const state = {
  allProductsArray: [],
};

/** Create a constructor function that creates an object associated with each product with the
 * following properties:
 * 1. Name of the product
 * 2. File path of the image
 * 3. Times the image has been shown
*/
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  //this.clicks = 0;
}


/** Create an algorithm that will:
 *  1. Randomly display 3 of the images
 *  2. Increment its times shown property by 1
 *  3. Attach an event listener to the HTML section they are displayed
 *  4. Once the user 'clicks' a product, generate 3 new products for the user to pick
*/
function getRandomNumber() {
  return Math.floor(Math.random() * state.allProductsArray.length);
}

function renderProducts() {
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();
  let product3 = getRandomNumber();

  // Verify that none of the three products are the same
  while (product1 === product2 || product1 === product3 || product2 === product3) {
    product2 = getRandomNumber();
    product3 = getRandomNumber();
  }

  image1.src = state.allProductsArray[product1].src;
  image2.src = state.allProductsArray[product2].src;
  image3.src = state.allProductsArray[product3].src;

  image1.alt = state.allProductsArray[product1].name;
  image2.alt = state.allProductsArray[product2].name;
  image3.alt = state.allProductsArray[product3].name;

  state.allProductsArray[product1].views++;
  state.allProductsArray[product2].views++;
  state.allProductsArray[product3].views++;
}

function clickProduct(event){
  if (event.target === productContainer){
    alert('Please click on an image');
  }
  clicks++;
  let clickProduct = event.target.alt;
  for (let i = 0; i < state.allProductsArray.length; i++){
    if (clickProduct === state.allProductsArray[i].name){
      state.allProductsArray[i].clicks++;
      break;
    }
  }
  if (clicks === maxClicks){
    productContainer.removeEventListener('click', clickProduct);
    resultButton.addEventListener('click', renderResults);
    resultButton.className = 'clicks-allowed';
    productContainer.className = 'no-voting';
  } else {
    renderProducts();
  }
}

function renderResults(){
  let ul = document.querySelector('ul');
  for (let i = 0; i < state.allProductsArray.length; i++){
    let li = document.createElement('li')
    li.textContent = `${state.allGoatsArray[i].name} had ${state.allProductsArray[i].views} views and was clicked ${state.allProductsArray[i].clicks} times.`;
    ul.appendChild(li);
  }
}

//executable
let bag = new Product('bag', './img/bag.png');
let banana = new Product('banana', './img/banana.jpg');
let bathroom = new Product('bathroom', './img/bathroom.jpg');
let boots = new Product('boots', './img/boots.jpg');
let breakfast = new Product('breakfast', './img/breakfast.jpg');
let bubblegum = new Product('bubblegum', './img/bubblegum.jpg');
let chair = new Product('chair', './img/chair.jpg');
let cthulhu = new Product('cthulhu', './img/cthulhu.jpg');
let dogDuck = new Product('dog-duck', './img/dog-duck.jpg');
let dragon = new Product('dragon', './img/dragon.jpg');
let pen = new Product('pen', './img/pen.jpg');
let petSweep = new Product('pet-sweep', './img/pet-sweep.jpg');
let scissors = new Product('scissors', './img/scissors.jpg');
let shark = new Product('shark', './img/shark.jpg');
let sweep = new Product('sweep', './img/sweep.jpg');
let tauntaun = new Product('tauntaun', './img/tauntaun.jpg');
let unicorn = new Product('unicorn', './img/unicorn.jpg');
let waterCan = new Product('water-can', './img/water-can.jpg');
let wineGlass = new Product('wine-glass', './img/wine-glass.jpg');
state.allProductsArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep,
  scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderProducts();

productContainer.addEventListener('click', clickProduct);

/** From the users POV
 *  1. track the selections made by viewers
 *  2. In the constructor function define a property to hold the # of times a product is clicked
 *  3. After every selection by the viewer, update the newly added property to reflect the click
 */

/** From the users POV
 *  1. Allow the user to control the # of rounds a user is presented with
 *  2. By default the user should be presented 25 rounds
 *  3. Keep the # of rounds in a variable to allow the number to be easily changed for debug/test
 */

/** From User POV
 *  1. View of results after all rounds of voting have concluded
 *  2. create a property attached to the constructor function tracking all products currently being considered
 *  3. After voting rounds are complete, remove the event listeners on the product
 *  4. Add a button to `View Results` when clicked displays the list of all products followed by the votes received
 *      Format: banana had 3 votes, and was seen 5 times.
 *        - NOTE: Displayed product names should match the file name for the product.
 *            Example: the product represented with `dog-duck.jpg` should be displayed
 *                      to the user as exactly “dog-duck” when the results are shown.
 */
