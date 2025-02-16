import mongoose ,{Schema, Types} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema= new Schema({
 username:{
    type: String,
    required: true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
 },
 email:{
    type: String,
    required: true,
    unique:true,
    lowercase:true,
    trim:true
 },
fullname:{
    type: String,
    required: true,
    lowercase:true,
    trim:true,
    index:true
 },
avatar :{
    type:String,//cloudinary url
    required:true
},
coverimage:{
    type:String //cloudinary url
},
watchHistory:[
    {
        type:Schema.Types.ObjectId,
        ref:"Video"
    }
],
password:{
    type:String,
    required:[true,'Password is required']
},
refreshtoken:{
    type:String
}
},{timestamps:true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.ispasswordcorrect=async function(password){
   return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccesstoken= function(){
 return jwt.sign({
    _id:this.id,
    email:this.email,
    username:this.username,
    fullname:this.fullname
 },process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
 })
}

userSchema.methods.generaterefreshtoken= function(){
    return jwt.sign({
        _id:this.id,
     },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
     })
}
    
    

export const User = mongoose.model("User",userSchema); 