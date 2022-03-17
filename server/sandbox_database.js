const dedicatedbrand = require('./sources/dedicatedbrand');
const adressParisBrand = require('./sources/adresse_paris');
const montlimarbrand = require('./sources/Montlimart');

const db = require('./db');

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/all-men?p=') {
   try {
     console.log(`🕵️‍♀️  browsing ${eshop} source`);
    //  let allproduct=[];
     for(let i=1; ;i++)
     {
        const product = await dedicatedbrand.scrape(eshop + i.toString());
        const len=product.length;
        if (len!=0){
          
          console.log(product);
          const result = await db.insert(product);
          console.log(` ${result.insertedCount} inserted products`);
        }
        else{                    
          console.log('done');
          process.exit(0);
        }
    };
      
   } 
   catch (e) {
     console.error(e);
     process.exit(1);
   }  
 }



//  adresseParis : https://adresse.paris/630-toute-la-collection?id_category=630&n=118
//  async function sandbox (eshop = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=118') {
//       try {
//       console.log(`🕵️‍♀️  browsing ${eshop} source`);
 
//      const product = await adressParisBrand.scrape(eshop);
//      //let allproduct=[];
//      //product.forEach(item => allproduct.push(item));
//      // allproduct = allproduct.filter(item => item.get() !== undefined)
//      console.log(product);
//      const result = await db.insert(product);
//      console.log(` ${result.insertedCount} inserted products`);
 
//      // process.exit(0);
//     } catch (e) {
//       console.error(e);
//       process.exit(1);
//     }
//   }

//Montlimard
//   async function sandbox (eshop = 'https://www.montlimart.com/toute-la-collection.html') {
//     try {
//     console.log(`🕵️‍♀️  browsing ${eshop} source`);

//    const product = await montlimarbrand.scrape(eshop);

//    console.log(product);
//    const result = await db.insert(product);
//    console.log(` ${result.insertedCount} inserted products`);
   
//    // process.exit(0);
//   } catch (e) {
//     console.error(e);
//     process.exit(1);
//   }
// }




 async function sandbox2(){
     sandbox();    
     db.close(); 
     console.log('done 2');
    }
 

async function sandbox3(){
  db.clean();
  console.log('cleaning done !')
}


async function sandbox4(){
  const relatedBrands=await db.find({'brand':'Adresse Paris'});
  console.log(relatedBrands);
  console.log(` ${relatedBrands.length} products returned`);
}


async function sandbox5(){
  let limit = 10;
  let brand = 'Adresse Paris';
  let price = 50;
  const relatedBrands=await db.filteredproducts(limit, brand, price);
  console.log(relatedBrands);
  console.log(` ${relatedBrands.length} products returned`);
}


//insert
//sandbox();

// sandbox2();

//delete;
// sandbox3();

//products related by brands
//sandbox4();

//products under a certain price
//sandbox5();