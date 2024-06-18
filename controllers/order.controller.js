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
        const myOrders = await orderModel.find({ user: _id }).populate("user", "name email");
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            myOrders
        })  
    } catch (error) {
        console.log(error)
        next(errorHandler(500, error.message))
    }
}

// Update Order Status--Admin
export const updateOrder = async (req, res, next) => {
    const { id } = req.query;
    const { status } = req.body;
    if(!status){
        return next(errorHandler(400, "Please provide status"))
    }
    try {
        const order=await orderModel.findById(id);
        if(!order){
            return next(errorHandler(404, "Order not found"))
        }
        if(order.orderStatus==="Delivered"){
            return next(errorHandler(400, "You have already delivered this order"))
        }
        order.orderItems.forEach(async (o)=>{
            await updateStock(o.product, o.quantity)
        })
        order.orderStatus=status;
        if(status==="Delivered"){
            order.deliveredAt=Date.now();
        }
        await order.save({validateBeforeSave:false});
        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        })  
    } catch (error) {
        next(errorHandler(500, error.message))
    }
}
async function updateStock(id, quantity){
    const product=await productModel.findById(id);
    product.quantity-=quantity;
    await product.save({validateBeforeSave:false});
}
export async function deleteOrder(req, res, next) {
    const { id } = req.query;
    try {
        const order = await orderModel.findByIdAndDelete(id);
        if (!order) {
            return next(errorHandler(404, "Order not found"));
        }
        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
            order
        })
    } catch (error) {
        next(errorHandler(500, error.message))
    }
}