const fetch = require('node-fetch');
const cheerio = require('cheerio');

// /**
//  * Parse webpage e-shop
//  * @param  {String} data - html response
//  * @return {Object} products
//  */
// const parse = data => {
//   const $ = cheerio.load(data);

//   return $('.item')
//     .map((i, element) => {      
//       const name = $(element)
//     .find('.product-name')
//     .text().trim();
//     const price = parseFloat(
//     $(element)
//       .find('.price')
//       .text()
//     )
//     return {name, price};
//   }).get();
// };


/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Object} products
 */
 const parse = data => {
  const $ = cheerio.load(data);

  return $('.item')
    .map((i, element) => {      
      const name = $(element)
    .find('.product-name')
    .text().trim();
    const price = parseFloat(
    $(element)
      .find('.price')
      .text()
    )
    return {'brand':'Montlimart',name, price};
  }).get();
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