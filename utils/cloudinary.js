import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
});


const uploadoncloudinary= async (localfilepath)=>{
 try {
    if(!localfilepath) return null
    //upload the file on cloudinary
  const response = await cloudinary.uploader.upload(localfilepath,{
    resource_type: "auto"
 })
 console.log("file is uploaded on cloudinary",response.url)
 return response
 } catch (error) {
    fs.unlink(localfilepath)
    
    //remove the tempororay locally saved file as the operation got failed
    return null;
 }
}
export{ uploadoncloudinary}