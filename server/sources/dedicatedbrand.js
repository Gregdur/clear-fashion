const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
       
      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );

      return {name, price};
    })
    .get();
};


// const NumberOfProduct = async url =>{
//   const response = await fetch(url);
//   if (response.ok) {

//           const body = await response.text();
//           const result = parse(body);
//           const nbPage=Math.ceil(result[0]["nbProduct"]/result[0]["nbCurrent"]);
//           return nbPage;
// }

// module.exports.NumberOfProduct();

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


// /**
//  * Scrape all the products for a given url page
//  * @param  {[type]}  url
//  * @return {Array|null}
//  */
//  module.exports.scrape = async url => {
//   try {
//     const response = await fetch(url);

//     if (response.ok) {

//       const body = await response.text();
//       const result = parse(body);
//       const nbproduct=result[0]["nbCurrent"];
//       let i=1;
//       let allproduct=[];

//       while(nbproduct!=0){
//         const url2='https://www.dedicatedbrand.com/en/men/all-men?p='+i.toString();
//         try{
//           const response2=await fetch(url2);

//           if (response2.ok){
//             const body = await response2.text();
//             allproduct=allproduct.concat(parse(body2))                   
//           }
//           else{
//             console.error(response2)
//             return null
//           }
//         }catch(error){
//           console.error(error);
//           return null;
//         }

//         i++;
//       }



//       return parse(body);
//     }

//     console.error(response);

//     return null;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

