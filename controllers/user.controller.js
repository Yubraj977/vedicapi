export async function getMyInfo(req,res,next){
    console.log(req.user)
    
    res.status(200).json({
        success:true,
        user:{
            name:req.user.name,
            email:req.user.email,
            profileImage:req.user.profileImage,
            isverified:req.user.isverified,
            userType:req.user.userType,
        }
    })
}