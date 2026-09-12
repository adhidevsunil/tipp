import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Indoor', 'Outdoor', 'Succulent', 'Flowering', 'Medicinal', 'Bonsai', 'Other'],
      default: 'Indoor',
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    careInstructions: {
      sunlight: { type: String, enum: ['Low', 'Partial', 'Full'], default: 'Partial' },
      watering: { type: String, enum: ['Low', 'Moderate', 'High'], default: 'Moderate' },
      difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
