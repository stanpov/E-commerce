import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      productName: req.body.productName,
      image: req.body.image,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      rating: 0,
      numReviews: 0,
    });

    const product = await newProduct.save();
    if (product) {
      res.status(201).send(product);
    } else {
      res
        .status(500)
        .send({ message: "Something went wrong, while creating product" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong while creating product." });
  }
};
