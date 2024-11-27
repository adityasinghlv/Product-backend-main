const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');  // Assuming you have a Category model

mongoose.connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Sample Categories
    const categories = [
      {
        name: 'Clothings',
        description: 'Category for Clothings items'
      },
      {
        name: 'Home appliances',
        description: 'Category for Home appliances items'
      },
      {
        name: 'Household furniture',
        description: 'Category for Household furniture items'
      }
    ];

    // Insert categories if they don't exist
    for (const category of categories) {
      const existingCategory = await Category.findOne({ name: category.name });

      if (!existingCategory) {
        const newCategory = await Category.create(category);
        console.log(`Category "${category.name}" inserted.`);
      } else {
        console.log(`Category "${category.name}" already exists.`);
      }
    }

    // Get category references (Category ObjectIds)
    const clothingCategory = await Category.findOne({ name: 'Clothings' });
    const homeAppliancesCategory = await Category.findOne({ name: 'Home appliances' });
    const furnitureCategory = await Category.findOne({ name: 'Household furniture' });

    // Generate 50 products (same as before)
    const productNames = [
      'Xyz', 'ABC', 'Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5',
      'Item A', 'Item B', 'Item C', 'Item D', 'Item E', 'Item F', 'Item G', 'Item H', 
      'Item I', 'Product A', 'Product B', 'Product C', 'Gadget 1', 'Gadget 2', 'Gadget 3',
      'Appliance 1', 'Appliance 2', 'Furniture 1', 'Furniture 2', 'Furniture 3', 'Electronics 1',
      'Electronics 2', 'Electronics 3', 'Clothing A', 'Clothing B', 'Clothing C', 'Clothing D', 
      'Furniture X', 'Furniture Y', 'Gadget X', 'Appliance X', 'Appliance Y', 'Item X', 'Item Y',
      'Tech 1', 'Tech 2', 'Tech 3', 'Kitchen 1', 'Kitchen 2', 'Kitchen 3', 'Living 1', 'Living 2', 
      'Living 3', 'Bedroom 1', 'Bedroom 2', 'Bedroom 3', 'Office 1', 'Office 2', 'Office 3'
    ];

    // Create 50 products
    const products = [];

    for (let i = 0; i < 50; i++) {
      const randomCategoryIndex = Math.floor(Math.random() * 3); // Random category index (0-2)
      let randomCategory;

      if (randomCategoryIndex === 0) {
        randomCategory = clothingCategory;
      } else if (randomCategoryIndex === 1) {
        randomCategory = homeAppliancesCategory;
      } else {
        randomCategory = furnitureCategory;
      }

      const product = {
        name: `${productNames[i]} ${i + 1}`,
        category: randomCategory._id,  // Ensure category ObjectId is used here
        price: Math.floor(Math.random() * 500) + 50,  // Random price between 50 and 500
        discount: Math.floor(Math.random() * 50),  // Random discount between 0% and 50%
        description: `This is the description for product ${i + 1}`,
        imageUrl: `https://fastly.picsum.photos/id/${i}/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU`, // Random image URL
      };

      products.push(product);
    }

    // Insert the generated products into the database
    await Product.insertMany(products);
    console.log('Products inserted');

    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
