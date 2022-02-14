/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adressParisBrand = require('./sources/adresse_paris');
const montlimarbrand = require('./sources/Montlimart');

// async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
//    try {
//      console.log(`🕵️‍♀️  browsing ${eshop} source`);

//      const products = await dedicatedbrand.scrape(eshop);

//      console.log(products);
//      console.log('done');
//      process.exit(0);
//    } catch (e) {
//      console.error(e);
//      process.exit(1);
//    }
//  }

//  async function sandbox (eshop = 'https://www.loom.fr/collections/hauts-homme') {
//   try {
//      console.log(`🕵️‍♀️  browsing ${eshop} source`);

//     const products = await loom.scrape(eshop);

//     console.log(products);
//     console.log('done');
//     process.exit(0);
//    } catch (e) {
//      console.error(e);
//      process.exit(1);
//    }
//  }

//dedicated
// async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/all-men?p=') {
//    try {
//      console.log(`🕵️‍♀️  browsing ${eshop} source`);
//      let allproduct=[];
//      for(let i=1; ;i++){
//         const product = await dedicatedbrand.scrape(eshop + i.toString());
//         const len=product.length;
//         //allproduct=allproduct.concat(product);
//         if (len!=0){
//           //console.log(allproduct);
//           //allproduct=allproduct.concat(product);
//           console.log(product);
//         }
//         else{                    
//           //console.log(allproducts);
//           console.log('done');
//           process.exit(0);
//         }


//     };

     
//    } 
//    catch (e) {
//      console.error(e);
//      process.exit(1);
//    }
//  }




//adresseParis : https://adresse.paris/630-toute-la-collection?id_category=630&n=118
// async function sandbox (eshop = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=118') {
//      try {
//      console.log(`🕵️‍♀️  browsing ${eshop} source`);

//     const products = await adressParisBrand.scrape(eshop);

//     console.log(products);
//     console.log('done');
//     process.exit(0);
//    } catch (e) {
//      console.error(e);
//      process.exit(1);
//    }
//  }



//montlimart : https://www.montlimart.com/toute-la-collection.html
async function sandbox (eshop = 'https://www.montlimart.com/toute-la-collection.html') {
     try {
     console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await montlimarbrand.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
   } catch (e) {
     console.error(e);
     process.exit(1);
   }
 }





const [,, eshop] = process.argv;

sandbox(eshop);
