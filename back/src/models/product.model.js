import mongoose from "mongoose";

const Product = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            requered:true
        },
        image:{
            url:String,
            public_id:String
        },
        quantity:{
            type:Number,
            requered:true
        },
        description:{
            type:String,
            required:true,
        },
        category:{
            type:[String],
            default:[]
        },
        currency:{
            type:String
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        }
    },{
        timestamps:true,
        versionKey:false
    }
)
export default mongoose.model("product",Product)