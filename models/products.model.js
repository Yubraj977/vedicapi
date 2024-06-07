import mongoose from "mongoose";
const productSchema=new mongoose.Schema({  
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    quantity:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        default:'uncategorized'
    },
    image:{
        type:String,
        required:true,
    },
    averageRating:{
        type:Number,
        default:0
    },
    reviewCount:{
        type:Number,
        default:0
    }
},{timestamps:true})
const productModel=mongoose.model("products",productSchema)
export default productModel
