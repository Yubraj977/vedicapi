import uploadFileInCloudinary from "../helpers/cloudinary.js"
import mongoose from "mongoose";
import productModel from "../models/products.model.js";
import { errorHandler } from "../helpers/Error.js";

export async function createProduct(req,res,next){
    const {name,description,price,quantity,category}=req.body;
    if(!name || !description || !price || !quantity || !category){
        return next(errorHandler(400,'please provide all the fields'))
    }

    const myProduct=new productModel({name,description,price,quantity,category});
  try {
    if(!req.file){
      return next(errorHandler(400,'please provide image'))
    }
    const localFilePath=req.file.path
  
    const uploadResult=await uploadFileInCloudinary(localFilePath)
    const imageUrl=await uploadResult.secure_url;
    myProduct.image=imageUrl;
    await myProduct.save();
    res.json({
      success:true,
      message:'product created successfully',
      myProduct
    })
  } catch (error) {
    next(error)
  }
}



export async function updateProduct(req,res,next){
    const {id}=req.params;
  
   
    const {name,description,price,quantity,category}=req.body;
  
    if(!name || !description || !price || !quantity || !category){
        return next(errorHandler(400,'please provide all the fields'))
    }

    try {
      
   
      const myProduct=await productModel.findById(id);
      if(!myProduct){
        return next(errorHandler(404,'product not found'))
      }
      if(req.file&&req.file.path){
        const localFilePath=req.file.path
        const uploadResult=await uploadFileInCloudinary(localFilePath)
        const imageUrl=await uploadResult.secure_url;
        myProduct.image=imageUrl;
      }
      myProduct.name=name;
      myProduct.description=description;
      myProduct.price=price;
      myProduct.quantity=quantity;
      myProduct.category=category;
      
      await myProduct.save();
  
  
  
      res.json({
          success:true,
          message:'product updated successfully',
          myProduct
      })
 
  
  
  
    } catch (error) {
      next(error)
    }
   
}
export async function deleteProduct(req,res,next){
   const {id}=req.params;
   const myProduct=await productModel.findByIdAndDelete(id);
   res.json({
    success:true,
    message:'product deleted successfully'
   })
}


export async function getAllProducts(req,res,next){
  try {
    const products=await productModel.find();
    res.json({
        success:true,
        message:'product fetched successfully',
        products
    })
  } catch (error) {

    clg(error)
    next(error)
  
  }
  
}
export async function SingleProductDetial(req,res,next){
try {
  const {id}=req.params;
  const product=await productModel.findById(id);
  res.json({
    success:true,
    message:'product fetched successfully',
    product
  })


} catch (error) {
  next(error)
}


}
