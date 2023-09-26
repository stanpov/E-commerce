import Product from "../models/productModel.js";
import { brands, productCategories } from "../categories/categories.js";
import { Review } from "../models/productModel.js";
import User from "../models/userModel.js";

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      productName: req.body.productName,
      image: req.body.image,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      brand: req.body.brand,
      rating: req.body.rating,
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
    res.status(500).send({ message: error.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 9;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let category = req.query.category || "ALL";
    let brand = req.query.brand || "ALL";
    let rangePrice = {};

    if (category === "ALL") {
      category = [...productCategories];
    } else {
      category = category.split(",");
    }

    if (brand === "ALL") {
      brand = [...brands];
    } else {
      brand = brand.split(",");
    }

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
    if (req.query.rangeprice) {
      let sorted = req.query.rangeprice.split(",");
      rangePrice["min"] = Number(sorted[0]);
      rangePrice["max"] = Number(sorted[1]);
    }

    const products = await Product.find({
      productName: { $regex: search, $options: "i" },
      brand: { $in: brand },
      price: {
        $gte: req.query.rangeprice ? rangePrice.min : 0,
        $lte: req.query.rangeprice ? rangePrice.max : 10000000,
      },
    })

      .where("category")
      .in([...category])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);
    const total = await Product.countDocuments({
      category: { $in: [...category] },
      productName: { $regex: search, $options: "i" },
    });

    const response = {
      total,
      page: page + 1,
      limit,
      category: category,
      brand: brand,
      products,
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    return res.status(500).send(error.message);
  }
};

export const addRating = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      const updateFields = req.body;
      for (const key in updateFields) {
        if (!Review.schema.obj.hasOwnProperty(key)) {
          return res.status(400).send({
            message: "Bad request",
            response: `---> ${key} <--- field doesnt exists in Product schema`,
          });
        }
      }
      product.rating.push(updateFields);
      product.save().then((response) => {
        return res
          .status(201)
          .json({ message: "Rating added successfully", data: response });
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
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
    return res.status(500).send(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.numReviews += 1;
      product.save();
      if (req.user) {
        const currentUser = await User.findById({ _id: req.user.id });
        const lastReviewedUserData = currentUser.lastReviewed;

        if (lastReviewedUserData.length === 5) {
          const productId = product._id.toString();
          const existingProduct = lastReviewedUserData.findIndex(
            (item) => item._id.toString() === productId
          );
          if (existingProduct === -1) {
            const newLastReviewedUserData = lastReviewedUserData.slice(
              1,
              lastReviewedUserData.length
            );
            newLastReviewedUserData.push(product);
            currentUser.lastReviewed = newLastReviewedUserData;
            currentUser.save();
          }
        } else {
          await User.findOneAndUpdate(
            { _id: req.user.id },
            { $addToSet: { lastReviewed: product } }
          );
        }
        return res.status(200).send({ response: product });
      } else {
        return res.status(403).json({ message: "Unauthorized" });
      }
    } else {
      return res
        .status(404)
        .send({ message: `Prodcut with id: ${req.params.id} not found.` });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
