import userModel from "../models/user.model.js";
import { errorHandler } from "../helpers/Error.js";
export async function getMyInfo(req,res,next){
   
    res.status(200).json({
        success:true,
        user:{
            name:req.user.name,
            email:req.user.email,
            profileImage:req.user.profileImage,
            isverified:req.user.isverified,
            userType:req.user.userType,
            mobile:req.user.mobile
        }
    })
}
export async function updateMyInfo(req, res, next) {
    const { name, mobile } = req.body;
    
    try {
        const user = await userModel.findByIdAndUpdate(req.user._id, { name, mobile });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Update successful',
            
        });
    } catch (error) {
       next(errorHandler(500, error.message))
    }
}
