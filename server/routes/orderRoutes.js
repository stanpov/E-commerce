import exporess from "express";
import { createOrder, getAllOrders } from "../controllers/orderController.js";

const orderRouter = exporess.Router();

orderRouter.post("/createorder", createOrder);

orderRouter.get("/allorders", getAllOrders);

export default orderRouter;
