import { errorHandler } from "../helpers/Error.js";
import dotenv from 'dotenv'
import Stripe from "stripe";
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

dotenv.config();

export async function processPayment(req,res,next){
try {
    const myPayment=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            integration_check:"accept_a_payment"
        }
    })
    
    res.status(200).json({
        success:true,
        clientSecret:myPayment.client_secret
    })
} catch (error) {
    next(errorHandler(500,error.message))
}

}
export async function sendStripeApiKey(req,res,next){
    try {
        res.status(200).json({
            success:true,
            stripeApiKey:process.env.STRIPE_PUBLISHABLE_KEY
        })
    } catch (error) {
        next(errorHandler(500,error.message))
    }
}