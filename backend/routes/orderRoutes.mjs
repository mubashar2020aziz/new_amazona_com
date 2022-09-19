import express from 'express';
const orderRouter = express.Router();

import Order from '../models/orderModel.mjs';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utls.mjs';

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // map function are using because in order model use product model reference
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: 'New order created', order });
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'order not found' });
    }
  })
);

export default orderRouter;
