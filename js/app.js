'use strict';

/**Globals */
let votingRounds = 25;
let prodArray = [];

/** DOM */
let productContainer = document.querySelector('img-container');
let resultButton = document.querySelector('show-results-btn');
let image1 = document.querySelector('img-one');
let image2 = document.querySelector('img-two');
let image3 = document.querySelector('img-three');
let resultsList = document.getElementById('results-container');

/** Create a constructor function that creates an object associated with each product with the
 * following properties:
 * 1. Name of the product
 * 2. File path of the image
 * 3. Times the image has been shown
*/
function Product(name, imageExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0;
}

/**Helpers/Utils */
function getRandomNumber() {
  return Math.floor(Math.random() * prodArray.length);
}


/** Create an algorithm that will:
 *  1. Randomly display 3 of the images
 *  2. Increment its times shown property by 1
 *  3. Attach an event listener to the HTML section they are displayed
 *  4. Once the user 'clicks' a product, generate 3 new products for the user to pick
*/

//same as renderImgs
function renderProducts() {
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();
  let product3 = getRandomNumber();

  // Verify that none of the three products are the same
  while (product1 === product2 || product1 === product3 || product2 === product3) {
    product2 = getRandomNumber();
    product3 = getRandomNumber();
  }

  image1.src = prodArray[product1].src;
  image2.src = prodArray[product2].src;
  image3.src = prodArray[product3].src;

  image1.title = prodArray[product1].name;
  image2.title = prodArray[product2].name;
  image3.title = prodArray[product3].name;

  prodArray[product1].views++;
  prodArray[product2].views++;
  prodArray[product3].views++;
}

/**Event handler */
function clickProduct(event){
  let imageClicked = event.target.title;

  for(let i = 0; i < prodArray.length; i++){
    if(imageClicked === prodArray[i].name){
      prodArray[i].votes++;
      votingRounds--;
      renderProducts();
    }
  }
  if(votingRounds === 0){
    productContainer.removeEventListener('click', clickProduct);
  }
}

function renderResults(){
  if(votingRounds === 0){
    for(let i = 0; i < prodArray.length; i++){
      let prodListItem = document.createElement('li');

      prodListItem.textContent = `${prodArray[i].name} - Votes: ${prodArray[i].votes} & Views: ${prodArray[i].views}`;

      resultsList.appendChild(prodListItem);
    }
    resultButton.removeEventListener('click', renderResults);
  }
}


//executable
let bag = new Product('bag', './img/bag.jpg');
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
let sweep = new Product('sweep', './img/sweep.png');
let tauntaun = new Product('tauntaun', './img/tauntaun.jpg');
let unicorn = new Product('unicorn', './img/unicorn.jpg');
let waterCan = new Product('water-can', './img/water-can.jpg');
let wineGlass = new Product('wine-glass', './img/wine-glass.jpg');

prodArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep,
  scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderProducts();

productContainer.addEventListener('click', clickProduct);
resultButton.addEventListener('click', renderResults);
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
