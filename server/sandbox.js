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
//           product.forEach(item => allproduct.push(item));
//           console.log(product);
//         }
//         else{                    
//           //console.log(allproducts);
//           console.log('done');
//           process.exit(0);
//         }
//         const fs = require('fs');

//         const data = JSON.stringify(allproduct);

//         fs.writeFile('listes_dedicatedbrand.json', data, (err) => {
//         if (err) {              
//           throw err;
//         }
        
//       });
//     };

      
//    } 
//    catch (e) {
//      console.error(e);
//      process.exit(1);
//    }
//  }




// adresseParis : https://adresse.paris/630-toute-la-collection?id_category=630&n=118
// async function sandbox (eshop = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=118') {
//      try {
//      console.log(`🕵️‍♀️  browsing ${eshop} source`);

//     const product = await adressParisBrand.scrape(eshop);
//     let allproduct=[];
//     product.forEach(item => allproduct.push(item));
//     // allproduct = allproduct.filter(item => item.get() !== undefined)

//     const fs = require('fs');

//     const data = JSON.stringify(allproduct);

//     fs.writeFile('listes_AdresseParis.json', data, (err) => {
//     if (err) {              
//       throw err;
//     }
        
//     });

//     console.log(allproduct);
//     console.log('done');
//     // process.exit(0);
//    } catch (e) {
//      console.error(e);
//      process.exit(1);
//    }
//  }



// montlimart : https://www.montlimart.com/toute-la-collection.html
async function sandbox (eshop = 'https://www.montlimart.com/toute-la-collection.html') {
     try {
     console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const product = await montlimarbrand.scrape(eshop);

    let allproduct=[];
    product.forEach(item => allproduct.push(item));
    const fs = require('fs');

    const data = JSON.stringify(allproduct);

    fs.writeFile('listes_Montlimard.json', data, (err) => {
    if (err) {              
      throw err;
    }
        
    });


    console.log(product);
    console.log('done');
    // process.exit(0);
   } catch (e) {
     console.error(e);
     process.exit(1);
   }
 }





const [,, eshop] = process.argv;

sandbox(eshop);
