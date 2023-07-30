import exporess from "express";
import { isAdmin, isAuth } from "../utils/utils.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controllers/productsController.js";

const productRouter = exporess.Router();

productRouter.get("/allproducts", getAllProduct);

productRouter.post("/create", isAuth, isAdmin, createProduct);

productRouter.put("/update/:id", isAuth, isAdmin, updateProduct);

productRouter.delete("/delete/:id", isAuth, isAdmin, deleteProduct);

productRouter.get("/product/:id", isAuth, getProductById);

export default productRouter;
