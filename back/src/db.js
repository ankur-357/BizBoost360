import mongoose from "mongoose";
import {mongodb_uri_key} from './config.js'

export const connectDB = async () =>{
    try {

        await mongoose.connect(mongodb_uri_key);
        console.log('>>> *** MONGODB *** <<<')
        
    } catch (error) {
        console.log(error)
    }
}
