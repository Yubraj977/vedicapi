import userModel from "../models/user.model.js"
import { errorHandler } from "../helpers/Error.js"
import bcrypt from "bcrypt"
import  jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
}
export async function signup(req, res, next) {
const {email,name,password}=req.body
if(!name || !email || !password){
    return next(errorHandler(400,'please provide all the fields'))
}

if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
    return next(errorHandler(400, 'Please provide all the fields'));
}
try {
    const hashPassword = bcrypt.hashSync(password, 10);
    const myUser=new userModel({name,email,password:hashPassword})
    await myUser.save();
    res.status(200).json({
        success:true,
        message:'user created successfully',
        myUser
    })
} catch (error) {
    next(errorHandler(500,error.message))
}

}





export async function googleLogin(req, res, next) {
    const {name,email,profile_url,emailVerified}=req.body
    const randomPassword='this!@#$@#$@#$@#$'
    if(!name || !email){
        return next(errorHandler(400,'please provide all the fields'))
    }
    if (name.trim() === '' || email.trim() === '') {
        return next(errorHandler(400, 'Please provide all the fields'));
    }


    try {

        const alreadyExist=await userModel.findOne({email})

        if(alreadyExist){
                return res.json({
                    toekn:createToken(alreadyExist._id),
                    success:true,
                    message:'user already exist',
                    user:alreadyExist
                })
            
        }
        if(!alreadyExist){
           
            const hashPassword = bcrypt.hashSync(randomPassword, 10);
            console.log(randomPassword)
            const myUser=new userModel({name,email,profileImage:profile_url,isverified:emailVerified,password:hashPassword})
            await myUser.save();
            res.status(200).json({
                token:createToken(myUser._id),
                success:true,
                message:'user created successfully',
                myUser
            })
        }  
    } catch (error) {
        next(errorHandler(500,error.message))
    }
   
}
export async function lgoin(req, res, next) {
 const {email,password}=req.body;
 if(!email || !password){
    return next(errorHandler(400,'please provide all the fields'))
 }  
 if(email.trim()==='' || password.trim()===''){
    return next(errorHandler(400,'please provide all the fields'))
 }
 try {
    const isEmailExist=await userModel.findOne({email})
    if(!isEmailExist){
        return next(errorHandler(404,'user not found'))
    }
    const isMatch=await bcrypt.compare(password,isEmailExist.password)
    if(!isMatch){
        return next(errorHandler(400,'incorrect password'))
    }

    const token=createToken(isEmailExist._id);
    res.cookie('access_token', token, {
        httpOnly: true, // Ensures the cookie is only accessible by the web server
        secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS
        sameSite: 'Strict', // CSRF protection
        maxAge: 60 * 1000 // Cookie expiration time (1 day)
    })
    .status(200).json({
        success:true,
        message:'login successfully',
        token:createToken(isEmailExist._id),
        user:isEmailExist
    })
 } catch (error) {
    next(errorHandler(500,error.message))
 }
}