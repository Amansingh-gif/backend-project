import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";
export const verifyJWT= asynchandler(async (req,res,next)=>{

try {
    const token=req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ","")
    if(!token) {
        throw new ApiError(400," you are not authorized")
    
    }
    const decodedtoken=jwt.verify(token,ACCESS_TOKEN_SECRET)
      const user=  User.findById(decodedtoken?._id).select("-password -refreshtoken")
     if(!user){
        //discuss about fronted
        throw new ApiError(401,"Invalid accesstoken")
     }
     req.user=user
     next()
} catch (error) {
    throw new ApiError(401,error.message || "invalid accesstoken")
}
})