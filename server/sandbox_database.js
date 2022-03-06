const dedicatedbrand = require('./sources/dedicatedbrand');
const adressParisBrand = require('./sources/adresse_paris');
const montlimarbrand = require('./sources/Montlimart');

const db = require('./database');

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

 async function sandbox2(){
     sandbox();    
     db.close(); 
     console.log('done 2');
    }
 

async function sandbox3(){
  
}


sandbox2();