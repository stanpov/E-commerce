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
      res.status(201).send({ response: product });
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

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ response: products });
  } catch (error) {
    return res.status(500).send("Something went wrong.");
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      const updateFields = req.body;
      for (const key in updateFields) {
        if (!Product.schema.obj.hasOwnProperty(key)) {
          return res.status(400).send({
            message: "Bad request",
            response: `---> ${key} <--- field doesnt exists in Product schema`,
          });
        }
      }
      await Product.findByIdAndUpdate({ _id: req.params.id }, updateFields, {
        new: true,
      }).exec((err, result) => {
        if (err) {
          res.status(400).send({ message: "Bad request" });
        } else {
          res
            .status(201)
            .send({ message: "Successfully updated", response: result });
        }
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (error) {
    return res.status(500).send("Something went wrong.");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "Successfully removed." });
    } else {
      res
        .status(404)
        .send({ message: `Product with id: ${req.params.id} not found.` });
    }
  } catch (error) {
    return res.status(500).send("Something went wrong.");
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).send({ response: product });
    } else {
      res
        .status(404)
        .send({ message: `Prodcut with id: ${req.params.id} not found.` });
    }
  } catch (error) {
    return res.status(500).send("Something went wrong.");
  }
};
