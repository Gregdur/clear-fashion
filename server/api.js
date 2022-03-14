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


const db = require('./database');


app.get('//p', (request, response) => {
  response.send({'rat': true});
});

app.get('/products/brand/', async(request, response) => {
  products = await db.find({'brand':'Adresse Paris'}, false)
  //console.log(products.length)
  response.send({"products" : products});
})

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
