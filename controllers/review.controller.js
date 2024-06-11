import reviewModel from "../models/reviews.model.js";
import { errorHandler } from "../helpers/Error.js";

export async function singleProductReview(req,res,next){
   const {productId}=req.query
   if(!productId){
    return next(errorHandler(400,'please provide product id'))
   }
   try {
    const productReviews=await reviewModel.find({productId})
    res.send(productReviews)
   } catch (error) {
    next(errorHandler(500,error.message))
   }
  

}

export async function AllProductReview(){
    
}

export async function myReviews(){

}
export async function createReview(req,res,next){
    try {
        const {_id}=req.user;
        const {productId}=req.query;
        const {rating,comment}=req.body;
        if(!productId){
            return next(errorHandler(400,'please provide product id'))
        }
        if(!rating || !comment){
            return next(errorHandler(400,'please provide rating and comment'))
        }
        const myReview=new reviewModel({userId:_id,productId,rating,comment});
        await myReview.save();
        res.status(200).json({
            success:true,
            message:'Review created successfully',
            myReview
        })
    } catch (error) {
        next(errorHandler(500,error.message))
    }
   
   
}

export async function editReview(){
    try {
        const {_id}=req.user;
        const {productId}=req.query;
        const {rating,comment}=req.body;
        if(!productId){
            return next(errorHandler(400,'please provide product id'))
        }
        if(!rating || !comment){
            return next(errorHandler(400,'please provide rating and comment'))
        }
       const validReview=await reviewModel.findOne({userId:_id,productId});
       if(!validReview){
        return next(errorHandler(404,'review not found'))
       }
       validReview.rating=rating;
       validReview.comment=comment;
       await validReview.save();
       res.status(200).json({
        success:true,
        message:'Review updated successfully',
        validReview
       })
    } catch (error) {
        next(errorHandler(500,error.message))
    } 
}

export async function deleteReview(){
    const {_id}=req.user;
    const {productId}=req.query;
    const {rating,comment}=req.body;
    if(!productId){
        return next(errorHandler(400,'please provide product id'))
    }
    const validReview=await reviewModel.findOne({userId:_id,productId});
    if(!validReview){
     return next(errorHandler(404,'review not found'))
    }
    await validReview.remove();
    res.status(200).json({
     success:true,
     message:'Review deleted successfully',
     validReview
    })
}