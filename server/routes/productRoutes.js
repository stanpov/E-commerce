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

productRouter.post("/create", createProduct);

productRouter.put("/update/:id", updateProduct);

productRouter.delete("/delete/:id", isAuth, isAdmin, deleteProduct);

productRouter.get("/product/:id", getProductById);

export default productRouter;
