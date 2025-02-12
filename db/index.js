import mongoose from "mongoose";
import { DB_NAME } from "../src/constants.js";


const connectDB= async ()=>{
  try {
   const connectioninstance= await mongoose.connect(`${process.env.MONGODB_URI
    }/${process.env.DB_NAMEDB_NAME}`)
    console.log(`database connected ${connectioninstance.connection.host}`)
  } catch (error) {
    console.log('error',error)
    process.exit(1)
  }
}

export default connectDB