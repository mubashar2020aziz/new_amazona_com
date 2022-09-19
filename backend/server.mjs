import data from './data.mjs';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
const app = express();
import connection from './dt/dt.mjs';
import seedRouter from './routes/seedRoutes.mjs';
import productRouter from './routes/productRoutes.mjs';
import userRouter from './routes/userRoutes.mjs';

connection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT;
app.listen(port, (req, res) => {
  console.log(`server at http://localhost:${port}`);
});
