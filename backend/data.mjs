import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Mubashar',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Nike Slim shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/assets/p1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality shirt',
    },

    {
      //_id: '2',
      name: 'Adidas Slim Shirt',
      slug: 'adodas-fit-shirt',
      category: 'shirt',
      image: '/assets/p2.jpg',
      price: 250,
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 12,
      description: 'high quality shirt',
    },
    {
      //  _id: '3',
      name: 'Nike Slim Pant',
      slug: 'nike-slim-pant',
      category: 'Pants',
      image: '/assets/p3.jpg',
      price: 25,
      countInStock: 0,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 17,
      description: 'high quality pant',
    },
    {
      // _id: '4',
      name: 'Puma Fit Pant',
      slug: 'puma-fit-pant',
      category: 'Pants',
      image: '/assets/p4.jpg',
      price: 65,
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 20,
      description: 'high quality pant',
    },
  ],
};
export default data;
