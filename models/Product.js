const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    description: { type: String },
    discountedPrice: { type: Number },
    imageUrl: { type: String, required: true }, // Save the image URL
    position : {type : Number,  unique : true}
  },
  { timestamps: true }
);

productSchema.pre('save', function (next) {
  if (this.discount > 0) {
    this.discountedPrice = this.price - (this.price * this.discount) / 100;
  } else {
    this.discountedPrice = this.price;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
