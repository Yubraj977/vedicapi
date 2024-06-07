import userModel from "../models/user.model.js"
import { errorHandler } from "../helpers/Error.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}
export async function signup(req, res, next) {
    const { email, name, password } = req.body
    if (!name || !email || !password) {
        return next(errorHandler(400, 'please provide all the fields'))
    }

    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
        return next(errorHandler(400, 'Please provide all the fields'));
    }
    try {
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            return next(errorHandler(400, 'User already exist'))
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const myUser = new userModel({ name, email, password: hashPassword })
        await myUser.save();
        // const token = createToken(myUser._id);
        // res.cookie('access_token', token, {
        //     httpOnly: true, // Ensures the cookie is only accessible by the web server
        //     secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS
        //     sameSite: 'Strict', // CSRF protection
        //     maxAge: 60 * 1000 // Cookie expiration time (1 day)
        // })
        res.status(200).json({
                success: true,
                message: 'User Created successfully',
                user: {
                    name: myUser.name,
                    email: myUser.email,
                    profileImage: myUser.profileImage
                }
            })
     
    } catch (error) {
        next(errorHandler(500, error.message))
    }

}





export async function googleLogin(req, res, next) {
    const { name, email, profile_url, emailVerified } = req.body
    const randomPassword = 'this!@#$@#$@#$@#$'
    if (!name || !email) {
        return next(errorHandler(400, 'please provide all the fields'))
    }
    if (name.trim() === '' || email.trim() === '') {
        return next(errorHandler(400, 'Please provide all the fields'));
    }


    try {

        const alreadyExist = await userModel.findOne({ email })
        if (alreadyExist) {
            const alreadyExistToken = createToken(alreadyExist._id);
            res.cookie('access_token', alreadyExistToken, {
                httpOnly: true, // Ensures the cookie is only accessible by the web server
                secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS
                sameSite: 'Strict', // CSRF protection
                maxAge: 60 * 1000 // Cookie expiration time (1 day)
            });
            return res.status(200).json({
                    success: true,
                    message: 'OLd urser login sucess',
                    user: {
                        name: alreadyExist.name,
                        email: alreadyExist.email,
                        profileImage: alreadyExist.profileImage
                    }
                })

    

        }
        if (!alreadyExist) {

            const hashPassword = bcrypt.hashSync(randomPassword, 10);
            const myUser = new userModel({ name, email, profileImage: profile_url, isverified: emailVerified, password: hashPassword })
            await myUser.save();

            const notAlreadyExistToken = createToken(myUser._id);
            res.cookie('access_token', notAlreadyExistToken, {
                httpOnly: true, // Ensures the cookie is only accessible by the web server
                secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS
                sameSite: 'Strict', // CSRF protection
                maxAge: 60 * 1000 // Cookie expiration time (1 day)
            }).status(200).json({
                token: createToken(myUser._id),
                success: true,
                message: 'user saved sucess and logged in sucess',
                user:{
                    name:myUser.name,
                    email:myUser.email,
                    profileImage:myUser.profileImage
                }
            })
        }
    } catch (error) {
        next(errorHandler(500, error.message))
    }

}
export async function lgoin(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(errorHandler(400, 'please provide all the fields'))
    }
    if (email.trim() === '' || password.trim() === '') {
        return next(errorHandler(400, 'please provide all the fields'))
    }
    try {
        const isEmailExist = await userModel.findOne({ email })
        if (!isEmailExist) {
            return next(errorHandler(404, 'user not found'))
        }
        const isMatch = await bcrypt.compare(password, isEmailExist.password)
        if (!isMatch) {
            return next(errorHandler(400, 'incorrect password'))
        }

        const token = createToken(isEmailExist._id);
        res.cookie('access_token', token, {
            httpOnly: true, // Ensures the cookie is only accessible by the web server
            secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS
            sameSite: 'Strict', // CSRF protection
            maxAge: 60 * 1000 // Cookie expiration time (1 day)
        }).status(200).json({
                success: true,
                message: 'login successfully',
                token: createToken(isEmailExist._id),
                user: {
                    name: isEmailExist.name,
                    email: isEmailExist.email,
                    profileImage: isEmailExist.profileImage
                }
            })
    } catch (error) {
        next(errorHandler(500, error.message))
    }
}
export  async function logout(req, res, next) {
    res.cookie('access_token', '', {
        httpOnly: true, // Ensures the cookie is only accessible by the web server
        secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS
        sameSite: 'Strict', // CSRF protection
        expires: new Date(0) // Cookie expiration time (1 day)
    }).status(200).json({
        success: true,
        message: 'logged out successfully'
    })
}


export  async function stillLogin(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
       return next(errorHandler(401, 'please login first Not Logged in'))
        
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
        next(errorHandler(401, 'please login first Not Logged in'))
    }
    const user = await userModel.findById(verify.id);
    if (!user) {
        next(errorHandler(401, 'please login first Not Logged in'))
    }
    res.status(200).json({
        success: true,
        user
    })
    
}
