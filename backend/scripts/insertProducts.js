const mongoose = require('mongoose');
const Product = require('../models/Product'); // Import product model

// Sample data
const products = [
  { name: 'Product 1', price: 100, discount: true, description: 'A sample product', category: 'Electronics', stock: 10 },
  { name: 'Product 2', price: 200, discount: false, description: 'Another sample product', category: 'Books', stock: 5 },
  { name: 'Product 3', price: 50, discount: false, description: 'Yet another product', category: 'Clothing', stock: 15 },
];

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/multimart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Connected to MongoDB');

    // Insert sample products
    try {
      await Product.deleteMany(); // Clear existing data
      await Product.insertMany(products);
      console.log('Products inserted successfully');
      process.exit(0); // Exit script
    } catch (error) {
      console.error('Error inserting products:', error);
      process.exit(1); // Exit script with error
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
