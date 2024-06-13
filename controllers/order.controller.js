import orderModel from "../models/order.model.js";
import { errorHandler } from "../helpers/Error.js";
import productModel from "../models/products.model.js";
import userModel from "../models/user.model.js";


// Create New order
export const createOrder = async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const { _id } = req.user;
    try {
        const myOrder = new orderModel({ shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, user: _id, paidAt: Date.now() });
        await myOrder.save();
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            myOrder
        })
    } catch (error) {
        next(errorHandler(500, error.message))
    }
   
}       
export const getSingleOrder = async (req, res, next) => {
    const { id } = req.query;
    try {
        const myOrder = await orderModel.findById(id).populate("user", "name email");
        if (!myOrder) {
            return next(errorHandler(404, "Order not found"));
        }
        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            myOrder
        })
    } catch (error) {
        next(errorHandler(500, error.message))
    }
}
export const myOrders = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const myOrders = await orderModel.find({ user: _id });
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            myOrders
        })  
    } catch (error) {
        next(errorHandler(500, error.message))
    }
}