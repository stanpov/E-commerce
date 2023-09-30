import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      isDelivered,
    } = req.body;

    const newOrder = new Order({
      user: userId,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      paymentResult: paymentResult,
      itemsPrice: itemsPrice,
      taxPrice: taxPrice,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,
      isPaid: isPaid,
      isDelivered: isDelivered,
    });

    for (let index = 0; index < orderItems.length; index++) {
      const element = orderItems[index];
      newOrder.orderItems.push(element);
    }

    const myOrder = await newOrder.save();
    if (myOrder) {
      return res
        .status(201)
        .json({ message: "Order successfully submited", result: myOrder });
    } else {
      return res
        .status(500)
        .send({ message: "Something went wrong, while preparing your order" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("orderItems.product");
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
