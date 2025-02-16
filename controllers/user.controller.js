import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser= asynchandler( async (req,res)=>{
  //get user details username ,password,fullname
  //authentication whether user sent string or null
  // check if user already exist or not
  // check for images, avatar
  // create user object - create entry in db
  // remove the password and refresh token from field response
  // check for user creation
  // return res
/*
   //basic way to day the validation
    if(fullname=="") {
       throw new ApiError(404," fullname cannot be null")
    }*/
    const{fullname,username,email,password}= req.body

    //directly checks all the fields of input validation
  if([
    fullname,username,email.password
  ].some((field)=>field?.trim()==="")){
  throw  new ApiError(400,"fullname cant be empty")
  }

  // to check whether the user exist or not
  const existed= await User.findOne({
    $or:[{username},{email}]
  })

  if(existed){
    throw new ApiError(409,"user with email and username already exist")
  }
 console.log(req.files);

  const avatarlocalpath=req.files?.avatar[0]?.path;
 // const coverimagelocalpath=req.files?.coverimage[0]?.path;
    //condition if you dont want to send the coverimage
    //the code still works
    
    let coverimagelocalpath;
    if (req.files && Array.isArray(req.files.coverimage) && req.files.coverimage.length >0 ) {
        coverimagelocalpath=req.files.coverimage[0].path
    }


  if(!avatarlocalpath){
    throw new ApiError(400,"avatar image could not find")
  }
  const finalavatar=await uploadoncloudinary(avatarlocalpath)
  const finalcover=await uploadoncloudinary(coverimagelocalpath)
 
  if(!finalavatar){
    throw new ApiError(400,"avatar image could not find")
  }
  const user = await User.create({
  fullname,
  avatar:finalavatar.url,
  coverimage:finalcover?.url || "",
  email,
  username:username.toLowerCase(),
  password
  })
  const createduser =  await User.findById(user._id).select(
    "-password -refreshtoken"
  )
  if(!createduser){
    throw new ApiError(500,"something went wrong while registering the user")
  }



return res.status(201).json(
    new ApiResponse(200,createduser,"user created successfully")
);

})

export {registerUser}