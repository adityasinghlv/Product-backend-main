const Product = require('../models/Product'); // Adjust path to your Product model

// Utility function to fetch and process products
const fetchAndProcessProducts = async () => {
  try {
    const products = await Product.find().sort({ position: 1 }).populate({
      path: 'category',
      select: 'name -_id',
    });

    return products.map((product) => {
      const originalPrice = product.price;
      const discount = product.discount;

      // Calculate the after-discount price
      let afterDiscount = originalPrice - (originalPrice * discount) / 100;

      // Apply additional discount based on the after-discount price
      if (afterDiscount < 200) {
        afterDiscount -= (afterDiscount * 20) / 100;
      } else if (afterDiscount <= 500) {
        afterDiscount -= (afterDiscount * 25) / 100;
      } else {
        afterDiscount -= (afterDiscount * 30) / 100;
      }

      // Extract the first digit of the after-discount price
      const firstDigit = parseInt(afterDiscount.toString()[0], 10);

      // Add the percentage of the first digit to the after-discount price
      afterDiscount += (afterDiscount * firstDigit) / 100;

      return {
        _id: product._id,
        name: product.name,
        category: product.category,
        price: originalPrice,
        discount: product.discount,
        finalPrice: afterDiscount.toFixed(4),
        description: product.description,
        imageUrl: product.imageUrl,
      };
    });
  } catch (error) {
    console.error('Error fetching or processing products:', error.message);
    throw error;
  }
};

module.exports = { fetchAndProcessProducts };
