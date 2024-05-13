import mongoose from "mongoose";

const Category = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    }
}
,{
    timestamps:false,
    versionKey:false
})

export default mongoose.model("categories",Category)