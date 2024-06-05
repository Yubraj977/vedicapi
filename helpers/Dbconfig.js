import mongoose from "mongoose";
const connectDb=function(url){
    mongoose
    .connect(url)
    .then(()=>{
        console.log('MongoDb is connected');
    })
    .catch((err)=>{
        console.log(err)
    })
    
}

export default connectDb;