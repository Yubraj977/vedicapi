import mongoose, { Schema } from "mongoose";
import userModel from "./user.model.js";
import productModel from "./products.model.js";
const reviewSchema=new mongoose.Schema({  
    ProductId:{
        type:Schema.Types.ObjectId,
        ref:'productModel'
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'userModel'
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    Comment:{
        type:String,

    }
},{timestamps:true})
const reviewModel=mongoose.model("review",reviewModel)
export default reviewModel
