const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.product-grid__item')
    .map((i, element) => {      
      return {    
        'brand': 'loom',
        'price': parseInt(
          $(element)
            .find('.money')
            .text()
        ),
        'name': $(element)
          .find('.product-title')
          .text()
          .trim()
          .replace(/\s/g, ' ')        
      };
    })
    .get();
};

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