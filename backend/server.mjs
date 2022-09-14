import data from './data.mjs';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
const app = express();

const port = process.env.PORT;

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.listen(port, (req, res) => {
  console.log(`server at http://localhost:${port}`);
});
