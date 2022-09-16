import data from './data.mjs';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
const app = express();

const port = process.env.PORT;

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'product not found' });
  }
});

app.listen(port, (req, res) => {
  console.log(`server at http://localhost:${port}`);
});
