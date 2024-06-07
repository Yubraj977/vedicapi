import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png'
    },
   isverified:{
       type:Boolean,
       default:false
   },
   userType:{
       type:String,
       enum:["admin","user",'moderator'],
       default:"user"
   }
},{timestamps:true})
const userModel=mongoose.model("user",userSchema)
export default userModel