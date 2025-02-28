// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable





/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

 var marketplace=require('./data')

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable
const NumberOfProduct=marketplace.length;
console.log('we have '+NumberOfProduct+' products')



// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have
const list_brands_name=[]
marketplace.forEach(element => {
  list_brands_name.push(element.brand)
});

console.log(list_brands_name);

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable
var list_sorted_price=marketplace;

function Sort_List(attribut){
  return function(a,b){
    if(a[attribut]>b[attribut]){
      return 1;
    }
    else if(a[attribut]<b[attribut]){
      return -1;
    }
    return 0;
  }
}

list_sorted_price.sort(Sort_List("price"));

console.log(list_sorted_price);

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

function Sort_List_Date(){
  var list_sorted_date = [];
  var i;
  var dateFormat;
  for(i=0;i < NumberOfProduct;i++){
    dateFormat = marketplace[i].date.toString();
    var temp =[new Date(dateFormat),marketplace[i].name,marketplace[i].brand,marketplace[i].price,marketplace[i].link];
    list_sorted_date.push(temp);
  }
  list_sorted_date.sort(function(a,b){
    return b[0] - a[0];
  });
  return list_sorted_date;
}
const list_date_final = Sort_List_Date();
console.log(list_date_final);

// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

const list_product_between50and100 = []

marketplace.forEach(element => {
  if ((element.price <= 100) && (element.price >= 50)) {
    list_product_between50and100.push(element)
  }
});

console.log('Price between 50 and 100')
console.log(list_product_between50and100)


// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average


var averageValue = 0

marketplace.forEach(element => {
  averageValue += element.price
});

console.log('the average basket is : ' + averageValue/ marketplace.length)




/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands
const brands = {}
var i;
var prodB;
for(i=0;i< list_brands_name.length;i++){
  prodB=[];
  var j;
  for(j=0;j<NumberOfProduct;j++){
    if(marketplace[j].brand == list_brands_name[i]){
      var product=[marketplace[j].name,marketplace[j].price,marketplace[j].link,marketplace[j].date];
      prodB.push(product);
    }
  }
  brands[list_brands_name[i]] = prodB;
}
console.log(brands);
var k;
var product_by_name_to_string = "";
for(var name1 in brands){
  product_by_name_to_string = name1+ " : "+ brands[name1].length +" products";
  console.log(product_by_name_to_string);
}

// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort
var brands_by_price = brands

for(let i in brands_by_price){
  brands_by_price[i].sort((a, b) => a.price - b.price)
}

console.log(brands_by_price)

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort
const brands_by_date = brands

for(let i in brands_by_date){
  brands_by_date[i].sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1))
}

console.log(brands_by_date)




/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products

//H
var p90=[];
for(const b in brands){
  var b_price=[];
  var idx = Math.round(0.9 * brands[b].length) - 1; 
  for(var i in brands[b]){
    b_price.push(brands[b][i][1]);
  }
  b_price.sort(function(a, b){return a-b});
  p90.push([b,b_price[idx]]);
}
console.log(p90);




/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
console.log('============================================================================')
console.log('New product:')
var diff
var counter = 0;

COTELE_PARIS.forEach(element => {
  diff = ((new Date(element.released)) - (Date.now()) / 1000*3600*24 )
  if(diff < 14){
    counter += 1
  }
});

if(counter == COTELE_PARIS.length)
{
  console.log(true)
}

// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€
console.log('Reasonable price shop or not')
var reason = true;

COTELE_PARIS.forEach(element => {
  if(element.price > 100){
    reason = false;
  }
});

console.log(reason)

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product

COTELE_PARIS.forEach(element => {
  if(element.uuid == `b56c6d88-749a-5b4c-b571-e5b5c6483131`){
    console.log(element.name)
  }
});

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product
var filtered = COTELE_PARIS.filter(elem => elem.uuid != 'b56c6d88-749a-5b4c-b571-e5b5c6483131');
console.log(filtered);
// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties

jacket = Object.assign({}, blueJacket,{'favorite':true});
console.log(jacket);
console.log(blueJacket);




/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage

localStorage.setItem("favoriteBrands",JSON.stringify(MY_FAVORITE_BRANDS));
console.log(JSON.parse(localStorage.getItem("favoriteBrands")));