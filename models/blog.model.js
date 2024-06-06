import mongoose from "mongoose";


const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    content:{
        type:String,
        required:true
    },
 
},{timestamps:true})

const blogModel=mongoose.model("blog",blogSchema)
export default blogModel

