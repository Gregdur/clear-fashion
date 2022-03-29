'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let currentFilters = {'brand': '','reasonable': 'no','favorite': 'no'};
let currentSort = '';
let favoriteProducts = [];

// let reas=Int(request.form['x1']);
// let reas = document.querySelector('#reasp');
// inititiate selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
const spanp50 = document.querySelector('#p50');
const spanp90 = document.querySelector('#p90');
const spanp95 = document.querySelector('#p95');
const checkReasonable = document.querySelector('#reasonable-check');
const checkFavorite = document.querySelector('#favorite-check');

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
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */


const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://server-nine-khaki.vercel.app/products/search?page=${page}&limit=${size}`
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


//RENDERS SECTION======================================================
/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');

  div.innerHTML = products
    .map(product => {
      return `
      <h5><div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}" target="_blank">${product.name}</a>
        <span>${product.price}€</span>
        <button data-id="${product._id}" class="favorite">add to favs</button>
        <span><img class="fit-picture" src=${product.photo}></span>
      </div></h5>
    `;
    })
    .join('');
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
  selectPage.innerHTML = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');
  selectPage.selectedIndex = currentPage - 1;
};

const renderBrands = products => {
  const brandNames = [''];
  for (const product of products) {
    if (!(brandNames.includes(product.brand))) {
      brandNames.push(product.brand);
    }
  }

  selectBrand.innerHTML = Array.from(
    brandNames,
    value => `<option value="${value}">${value}</option>`
  );
  selectBrand.selectedIndex = brandNames.indexOf(currentFilters['brand']);
};

/**
 * Render page selector
 * @param  {Object} products
 */
const renderIndicators = products => {
  spanNbProducts.innerHTML = products.length;
  if (products.length) {
    spanp50.innerHTML = percentile(50)+"€";
    spanp90.innerHTML = percentile(90)+"€";
    spanp95.innerHTML = percentile(95)+"€";
  }
};

const render = (products, pagination) => {
  products = filterProducts(products);
  sortProducts(products);
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(products);
  document.querySelectorAll('.favorite').forEach(item =>
    item.addEventListener('click', saveAsFavorite, false));
};
//END OF RENDERS SECTION======================================================


//EVENT CHANGE SECTION================================================
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

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value),
    currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectBrand.addEventListener('change', event => {
  currentFilters['brand'] = event.target.value;
  render(currentProducts, currentPagination);
});


checkReasonable.addEventListener('change', () => {
  currentFilters['reasonable'] = currentFilters['reasonable'] === 'yes' ? 'no' : 'yes';
  render(currentProducts, currentPagination);
});


checkFavorite.addEventListener('change', () => {
  currentFilters['favorite'] = currentFilters['favorite'] === 'yes' ? 'no' : 'yes';
  if(currentFilters['favorite'] =='yes'){
    render(favoriteProducts, currentPagination);
  }
  else{
    render(currentProducts, currentPagination);
  }
});


selectSort.addEventListener('change', event => {
  currentSort = event.target.value;
  render(currentProducts, currentPagination);
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);
//EVENT CHANGE SECTION================================================


//FUNCTION SECTION======================================================

//Sort================================================================
const sortPrice = (a, b) => a.price - b.price;

const sortDate = (a, b) =>
  a.released < b.released ? -1 : a.released === b.released ? 0 : 1;


const sortProducts = products => {
    switch (currentSort) {
    case 'price-asc':
      products.sort(sortPrice);
      break;
    case 'price-desc':
      products.sort(sortPrice).reverse();
      break;
    case 'date-asc':
      products.sort(sortDate);
      break;
    case 'date-desc':
      products.sort(sortDate).reverse();
      break;
    }
};
//Sort================================================================

//percentile==========================================================
function percentile(p){
    var prod=currentProducts.sort((a, b) => a.price - b.price);
    var i=Math.floor((p/100)*prod.length);
    return prod[i].price;
};
//percentile==========================================================
  

//pushFavorite========================================================
const saveAsFavorite = e => {
  const _id = e.currentTarget.getAttribute('data-id');
  if (favoriteProducts.some(p => p._id === _id)) {
    favoriteProducts = favoriteProducts.filter(p => p._id !== _id);
  } else {
    favoriteProducts.push(currentProducts.find(p => p._id === _id));
  }
  render(currentProducts, currentPagination);
};
//pushFavorite========================================================

//Filter==============================================================
const filterProducts = products => {
  if (currentFilters['favorite'] === 'yes') {
    products = favoriteProducts;
  }
  if (currentFilters['reasonable'] === 'yes') {
    products = products.filter(product => product.price < 100);
  }
  renderBrands(products);
  if (currentFilters['brand'] !== '') {
    products = products.filter(product => product['brand'] === currentFilters['brand']);
  }

  return products;
};
//Filter==============================================================


//END OF FUNCTION SECTION==============================================

