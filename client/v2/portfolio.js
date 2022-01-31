// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
//let list_Filters={'brands':''}
// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
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

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
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
//Section for sort functions=================================================


function Selection(currentProducts,selectedSorting){

  if (selectedSorting == 'price-asc'){
    sort_By_Price_Asc(currentProducts);
  }  
  else {
    sort_By_Price_Desc(currentProducts);
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