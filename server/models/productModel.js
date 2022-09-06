import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userName: { type: String, require: true },
    comment: { type: String, require: true },
    rating: { type: Number, require: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    category: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    countInStock: { type: Number, require: true },
    rating: { type: Number, require: true, default: 0 },
    numReviews: { type: Number, require: true, default: 0 },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
