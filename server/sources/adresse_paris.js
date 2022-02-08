const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.product_list .product-container')
  .map((i, element) => {      
    return {    
      'brand': 'Adresse Paris',
      'price': parseFloat(
                 $(element)
                   .find('.price.product-price')
                   .text()
      ),
      'name': $(element)
               .find('.product-name')
               .attr('title')
               .text()
               .trim()
               .replace(/\s/g, ' ')     
    };
  })
  .get();
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