import express from 'express';
const productRouter = express.Router();
import expressAsyncHandler from 'express-async-handler';

import Product from '../models/productModel.mjs';

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// product by category
productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'product not found' });
  }
});
export default productRouter;
