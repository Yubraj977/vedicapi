import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config();
cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
});



async function uploadFileInCloudinary(localFilePath) {
    try {
        const uploadResult=await cloudinary.uploader.upload(localFilePath,{
            folder:'vedicapiProducts',
        });
        fs.unlinkSync(localFilePath);
        return uploadResult
    } catch (error) {
        console.log('Error uploading to coudinary',error)
        throw error;
    }

}

export default uploadFileInCloudinary
