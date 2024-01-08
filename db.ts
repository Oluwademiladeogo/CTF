import {config} from "dotenv"
import mongoose from "mongoose"
config()
const uri:string = process.env.MONGODB_URI || ""
export const connectDB = async()=>{
    mongoose
  .connect(uri)
    .then (()=>{
        if (process.env.NODE_ENV === "development") {
            console.log("Connected to db")
        }
    })
    .catch((error)=>{
        console.log(error)
    })
}
connectDB()