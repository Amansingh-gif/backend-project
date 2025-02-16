import { ApiError } from "../utils/ApiError";
import { asynchandler } from "../utils/asynchandler";
import jwt from "jsonwebtoken"
export const verifyJWT= asynchandler(async (req,res,next)=>{

const token=req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ","")
if(!token) {
    throw new ApiError(400," you are not authorized")

}
const decodetoken=jwt.verify(token,ACCESS_TOKEN_SECRET)

})