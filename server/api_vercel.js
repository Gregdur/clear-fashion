"use strict";

// Import the dependency.

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const { MongoClient } = require('mongodb');
const { calculateLimitAndOffset, paginate }=require('paginate-info');

require('dotenv').config();

const MONGODB_DB_NAME = 'products';
const MONGODB_COLLECTION = 'products';
const MONGODB_URI = "mongodb+srv://gregdur:QBPypZx6YhxnIY8f@clearfashion.93alo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";



const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());


app.get('/', (request, response) => {
  response.send({'ack': true});
});

let client;
const options = {

  useUnifiedTopology: true,

  useNewUrlParser: true,

};

async function GetCollection(){
  client = await MongoClient.connect(MONGODB_URI, options);
  const db=client.db(MONGODB_DB_NAME);
  const collection=db.collection(MONGODB_COLLECTION);
  return await collection;
}




// app.get('//p', (request, response) => {
//   response.send({'rat': true});
// });

// app.get('/products', async(request, response) => {
//   products = await db.findAllProducts(true)
//   console.log(products.length)
//   response.send({"products" : products});
// })

// //http://localhost:8092/products/brand=?brand=Dedicated
// app.get('/products/brand=', async(request, response) => {
//   let brand = request.query.brand;
//   products = await db.find({'brand': `${brand}`}, false)
//   //console.log(products.length)
//   response.send({"products" : products});
// })

//http://localhost:8092/products/search?page=1&limit=12&brand=Montlimart
//https://server-nine-khaki.vercel.app/products/search?page=1&limit=12&brand=Montlimart
app.get('/products/search', async (request, response)=> {
  var filters={};
  var collection=await GetCollection();
  let limit=12;
  if('limit'in request.query){limit = parseInt(request.query.limit);}
  let page=1;
  if('page'in request.query){page = parseInt(request.query.page);}
  let brand;
  if('brand'in request.query){
    brand=request.query.brand;
    filters['brand']=brand;
  }

  const { offset } = calculateLimitAndOffset(page,limit);
  try{
    let result=await collection.find(filters).skip(offset).limit(limit).toArray();
    let count=await collection.find(filters).count();
    let meta=paginate(page,count,result,limit);
    meta.pageSize=limit;
    let products = {
          "success" : true,
          "data" : {
          "result" : result,
          "meta": meta
            }}
    response.send(products);
  }

  catch(e){
        response.send(e)
      }
  
})


// app.get('/browse', async(req, response) => {
//   try{
     
//     let res = await db.findPage(parseInt(req.query.page),parseInt(req.query.size));
//     let meta = await db.getMeta(parseInt(req.query.page),parseInt(req.query.size));
     
//   let products = {
//     "success" : true,
//     "data" : {
//     "result" : res,
//     "meta": meta
//       }}
//   response.send(products);

    
//   }catch(e){
//     response.send(e)
//   }
// })



app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
