import exporess from "express";
import { isAdmin, isAuth } from "../utils/utils.js";
import Product from "../models/productModel.js";
import { createProduct } from "../controllers/productsController.js";

const productRouter = exporess.Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.status(200).send(products);
});

productRouter.post("/create", isAuth, isAdmin, createProduct);

productRouter.put("/update/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (product) {
    (product.productName = req.body.productName),
      (product.image = req.body.image),
      (product.category = req.body.category),
      (product.description = req.body.description),
      (product.price = req.body.price),
      (product.countInStock = req.body.countInStock),
      await product.save();
    res.status(200).send({ message: "Successfully updated." });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

productRouter.delete("/delete/:id", isAuth, isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Successfully removed." });
  } else {
    res
      .status(404)
      .send({ message: `Product with id: ${req.params.id} not found.` });
  }
});

productRouter.get("/:id", isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).send(product);
  } else {
    res
      .status(404)
      .send({ message: `Prodcut with id: ${req.params.id} not found.` });
  }
});

export default productRouter;
