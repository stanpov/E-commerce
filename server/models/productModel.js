import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userName: { type: String, required: false },
    comment: { type: String, required: false },
    rating: { type: Number, required: false, max: 5, min: 0 },
  },
  { timestamps: true }
);

const imageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, unique: true },
    images: [imageSchema],
    category: {
      type: String,
      required: true,
      enum: ["TV", "Phones", "Laptops", "Headphones", "Monitors"],
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: [reviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
    brand: {
      type: String,
      required: true,
      enum: ["Sony", "Asus", "Philips", "Huawei", "Apple"],
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);

const Product = mongoose.model("Products", productSchema);
export default Product;
