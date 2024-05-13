import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 20,
            trim: true
        },
        email: {
            type: String,
            required: true,
            maxlength: 40,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        companyID: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Company",
            default: null
        },
        UA: {
            type: Boolean,
            default: false
        },
        EUA: {
            type: Boolean,
            default: false
        },
        token: {
            token: {
                type: String,
                default: null
            },
            used: {
                type: Boolean,
                default: false
            }
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
)
export default mongoose.model("User", User)