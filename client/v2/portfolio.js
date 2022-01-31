// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
const p50=document.querySelector('#p50');
const p90=document.querySelector('#p90');
const p95=document.querySelector('#p95');
const lastReleased = document.querySelector('#last-Release');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=24] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};





//section for function to display values on html
function percentile(p){
  var prod=currentProducts.sort((a, b) => a.price - b.price);
  var i=Math.floor((p/100)*prod.length);
  return prod[i].price;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;
  const perce50=percentile(50);
  const perce90=percentile(90);
  const perce95=percentile(95);

  spanNbProducts.innerHTML = count;

  //section for function to display values on html

  p50.innerHTML=perce50;
  p90.innerHTML=perce90;
  p95.innerHTML=perce95;
};


//filter by brands=========================================
function ListBrands(products) {
  let brandsname= [];
  for (var i=0;i<products.length;i++){
    if(brandsname.includes(products[i]["brand"])==false){
      brandsname.push(products[i]["brand"])
    }
  }
  return brandsname;
}


function renderBrands(brand) {
  let options='';

  for (var i=0;i<brand.length;i++){
    options+='<option value="'+ (brand[i]) + '">' + (brand[i]) + '</option>'
  }

  selectBrand.innerHTML=options;

}

function sortbrand(products,brand){
  const sortedproduct=[];
  for(var i=0; i<products.length;i++){
    if(products[i]["brand"]==brand){
      sortedproduct.push(products[i]);
    }
  }
  renderProducts(sortedproduct);
}
//filter by brands=========================================

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  const brand=ListBrands(currentProducts);
  renderBrands(brand);
};



//Section for sort functions=================================================

function sort_By_Price_Asc(currentProducts){
  let products_by_price = currentProducts.sort((a, b) => a.price - b.price);
  sortbrand(products_by_price,selectBrand.value);
}


function sort_By_Price_Desc(currentProducts){
  let products_by_price = currentProducts.sort((a, b) => b.price - a.price);
  sortbrand(products_by_price,selectBrand.value);
}



function compare_date_asc(a,b){
  if (a.released < b.released){
    return 1;
  }
  else if (a.released > b.released) {
    return -1;
  }
  else {
    return 0;
  }
}

function compare_date_desc(a,b){
  if (a.released>b.released){
    return 1;
  }
  else if (a.released<b.released){
    return -1;
  }
  else {
    return 0;
  }
}


function sort_By_Date_Asc(currentProducts){
  let sortedproducts = currentProducts.sort(compare_date_desc);
  sortbrand(sortedproducts,selectBrand.value);
}

function sort_By_Date_Desc(currentProducts){
  let sortedproducts = currentProducts.sort(compare_date_asc);
  sortbrand(sortedproducts,selectBrand.value);
}


function Sort_by_Last_release(currentProducts){
  var date = new Date();
  let RecentProducts = [];
  for(let i = 0; i < currentProducts.length; i++){
    var DateProduct = new Date(currentProducts[i].released);
    if(date - DateProduct< 86400*15000){
      RecentProducts.push(currentProducts[i]);
    }
  }
  sortbrand(RecentProducts);
}
//Section for sort functions=================================================


function Selection(currentProducts,selectedSorting){

  if (selectedSorting == 'price-asc'){
    sort_By_Price_Asc(currentProducts);
  }  
  else if (selectedSorting == 'price-desc'){
    sort_By_Price_Desc(currentProducts);
  }
  else if (selectedSorting == 'last-realease'){
    Sort_by_Last_release(currentProducts);
  }
  else if (selectedSorting == 'date-desc'){
    sort_By_Date_Asc(currentProducts);
  }
  else{
    sort_By_Date_Desc(currentProducts);
  }
}


/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});


//pagination
selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value),currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

//filter by brands

selectBrand.addEventListener('change',event=>{
  Selection(currentProducts,selectSort.value);
});

selectSort.addEventListener('change',event => {
  Selection(currentProducts,event.target.value);
  
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});