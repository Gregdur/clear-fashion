const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

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


const db = require('./db');


app.get('//p', (request, response) => {
  response.send({'rat': true});
});

app.get('/products/brand/', async(request, response) => {
  products = await db.find({'brand':'Adresse Paris'}, false)
  //console.log(products.length)
  response.send({"products" : products});
})


app.get('/products/search', async (request, response)=> {
  
  console.log(request.query);
  
  let limit = parseInt(request.query.limit);
  let brand = request.query.brand;
  let price = parseInt(request.query.price);
  console.log(limit);
  console.log(brand);
  console.log(price);
  let res = await db.filteredproducts(limit, brand, price);

  response.send({
    'limit' : limit,
    'results' : res
  });
})


app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
