import mongoose from "mongoose";

const Company = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sector:{
        type: String,
        required: true,
    },
    modelCurrency:{
            country: String,
            symbol: String,
            abbreviation: String
    },
    image:{
        url: String,
        public_id: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{
    timestamps:true,
    versionKey:false
})
export default mongoose.model("Company", Company)
