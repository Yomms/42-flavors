/* Sets a random integer quantity in range [1, 20] for each flavor. */
function setQuantities() {
var num = function getRandomIntInclusive(min, max) {
  				min = Math.ceil(min);
  				max = Math.floor(max);
  				return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
			} 

  for(var i = 0; i < 42; i++) {
  	var num1 = num(1, 20)
  	var rng = Math.floor(num1); 
  	var randomNumber = document.createTextNode(rng);
 	  var span = document.createElement("span");
 	  span.appendChild(randomNumber);
 	  span.className = 'quantity'

  	//var container = document.getElementById("container");
  	//var flavor = document.getElementsByClassName("flavor")[i];
  	var currentDiv = document.getElementsByClassName("meta")[i];
  	var theFirstChild = currentDiv.firstChild;
 	  currentDiv.insertBefore(span, theFirstChild);
  }
}

/* Extracts and returns an array of flavor objects based on data in the DOM. Each
 * flavor object should contain five properties:
 *
 * element: the HTMLElement that corresponds to the .flavor div in the DOM
 * name: the name of the flavor
 * description: the description of the flavor
 * price: how much the flavor costs
 * quantity: how many cups of the flavor are available
 */
var arrayOfFlavors = [];

function extractFlavors() {
 
  for(var i = 0; i < 42; i++) { 
    var flavorObjects = {};

    //To get the HTMLElement
    var htmlElement = document.getElementsByClassName("flavor")[i];

    //To get the name
    var description = document.getElementsByClassName("description")[i];
    var nameTag = description.getElementsByTagName("h2")[0];
    var nameOfFlavor = nameTag.innerHTML;

    //To get the Flavor
    var descriptionTag = description.getElementsByTagName("p")[0];
    var descriptionOfFlavor = descriptionTag.innerHTML;

    //To get the price
    var meta = document.getElementsByClassName("meta")[i];
    var priceTag = meta.getElementsByClassName("price")[0];
    var priceOfFlavor = priceTag.innerHTML;
    var priceOfFlavorFloat = parseFloat(priceOfFlavor.replace(/\$|,/g, ''));

    //To get the quantity
    var quantityTag = meta.getElementsByClassName("quantity")[0];
    var quantityOfFlavor = quantityTag.innerHTML;
    var quantityOfFlavorNumber = parseFloat(quantityOfFlavor);

    flavorObjects.element = htmlElement;
    flavorObjects.name = nameOfFlavor;
    flavorObjects.description = descriptionOfFlavor;
    flavorObjects.price = priceOfFlavorFloat;
    flavorObjects.quantity = quantityOfFlavorNumber;

    arrayOfFlavors[i] = flavorObjects;
    }
}
/* Calculates and returns the average price of the given set of flavors. The
 * average should be rounded to two decimal places. */
function calculateAveragePrice(flavors) {
  // TODO
  var sumTotal = 0;

  arrayOfFlavors.forEach(function(element){
    sumTotal += element.price
  })

  var averagePriceFinal = (sumTotal/arrayOfFlavors.length);
  return averagePriceFinal.toFixed(2);
}
/* Finds flavors that have prices below the given threshold. Returns an array
 * of strings, each of the form "[flavor] costs $[price]". There should be
 * one string for each cheap flavor. */
function findCheapFlavors(flavors, threshold) {
  // TODO
  var filteredCheapFlavors = arrayOfFlavors.filter(function(element){
    return element.price < threshold;
  });
  var reformattedFilteredCheapFlavors = filteredCheapFlavors.map(function(element){
    return element.name + " costs $" + element.price;
  })
  return reformattedFilteredCheapFlavors;
}

/* Populates the select dropdown with options. There should be one option tag
 * for each of the given flavors. */
function populateOptions(flavors) {
  // TODO
  var selectTag = document.getElementsByTagName("select");
  var select = selectTag[0];
  select.remove(0)

  function optionsCreation(element) {
    var name = element.name;
    var option = document.createElement("option");
    option.innerHTML = name;
    option.value = name;
    select.add(option);
  }
  arrayOfFlavors.map(optionsCreation);
}

/* Processes orders for the given set of flavors. When a valid order is made,
 * decrements the quantity of the associated flavor. */
function processOrders(flavors) {
  // TODO

  // the form tag
  var form1 = document.getElementsByTagName("form");
  var form = form1[0];

  // event listener for clicking "finalize order"
  form.addEventListener("submit", submitFunction);

  // function for what submitting does
  function submitFunction() {

  // the selected dropdown flavor
  var select1 = document.getElementsByTagName("select");
  var select = select1[0];
  var dropdown = select.value;

  // the input amount
  var inputTagOrder = document.getElementsByTagName("input");
  var orderAmount = inputTagOrder[0].value;

    for(i = 0; i < 42; i++){
      // the name of the flavor
      var description = document.getElementsByClassName("description")[i];
      var nameTag = description.getElementsByTagName("h2")[0];
      var nameOfFlavor = nameTag.innerHTML;

      // the quantity of the flavor
      var meta = document.getElementsByClassName("meta")[i];
      var quantityTag = meta.getElementsByClassName("quantity")[0];
      var quantityOfFlavor = quantityTag.innerHTML;
      var quantityOfFlavorNumber = parseFloat(quantityOfFlavor);
      if(dropdown === nameOfFlavor){
        var newAmount = quantityOfFlavorNumber - orderAmount;
        if(newAmount >= 0){
          quantityTag.innerHTML = newAmount;
          inputTagOrder[0].value = " ";
        }
          inputTagOrder[0].value = " ";
      }
    }
    event.preventDefault();
  }


}

/* Highlights flavors when clicked to make a simple favoriting system. */
function highlightFlavors(flavors) {
  // TODO
  var flavor = 0;
  var flavorTag = document.getElementsByClassName("flavor");

  for(var i = 0; i < 42; i++) {
    flavor = flavorTag[i];

    flavor.onclick = function(element) {
    this.classList.toggle("highlighted");
    console.log(element);
    }
  }  
} 



/***************************************************************************/
/*                                                                         */
/* Please do not modify code below this line, but feel free to examine it. */
/*                                                                         */
/***************************************************************************/


const CHEAP_PRICE_THRESHOLD = 1.50

// setting quantities can modify the size of flavor divs, so apply the grid
// layout *after* quantities have been set.
setQuantities()
const container = document.getElementById('container')
new Masonry(container, { itemSelector: '.flavor' })

// calculate statistics about flavors
const flavors = extractFlavors()
const averagePrice = calculateAveragePrice(flavors)
console.log('Average price:', averagePrice)

const cheapFlavors = findCheapFlavors(flavors, CHEAP_PRICE_THRESHOLD)
console.log('Cheap flavors:', cheapFlavors)

// handle flavor orders and highlighting
populateOptions(flavors)
processOrders(flavors)
highlightFlavors(flavors)
