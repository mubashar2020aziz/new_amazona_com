import mongoose from 'mongoose';

const connection = async () => {
  const DB = process.env.DATABASE;
  try {
    await mongoose.connect(DB);
    console.log('database connection successfull');
  } catch (error) {
    console.log('database connection fail');
  }
};
export default connection;
