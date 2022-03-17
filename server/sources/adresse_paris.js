const cheerio = require('cheerio');
const fetch = require('node-fetch');


// const parse = (data) => {
//   const $ = cheerio.load(data);
//   return $('.product-container')
//   .map((i, element)=> {
//     const name = $(element)
//     .find('.product-name-container.versionpc .product-name')
//     .attr('title');
//     const price = parseFloat(
//     $(element)
//       .find('.price.product-price')
//       .text()
//   );
//   return {name, price};
//   }).get();
// };


const parse = (data) => {
  const $ = cheerio.load(data);
  return $('.product-container')
  .map((i, element)=> {
    const name = $(element)
    .find('.product-name-container.versionpc .product-name')
    .attr('title');
    const price = parseFloat(
    $(element)
      .find('.price.product-price')
      .text()
  );
  const photo = $(element)
      .find('.product_img_link')
      .children()
      .attr('data-original');
      const link = $(element)
      .find('.product_img_link')
      .attr('href');

  return {'brand':'Adresse Paris',name, price,link,photo};
  }).get();
};


/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
 module.exports.scrape = async url => {
    try {
      const response = await fetch(url);
  
      if (response.ok) {
        const body = await response.text();
  
        return parse(body);
      }
  
      console.error(response);
  
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
};