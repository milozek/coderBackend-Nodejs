import mongoose, { Schema } from "mongoose"
import paginator from "mongoose-paginate-v2"

const userSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        dni: { type: String, required: true, index: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        status: { type: Boolean, default: true },
        role: {
            type: String,
            required: false,
            default: "user",
            enum: ["user", "premium_user", "admin"],
        },
    },
    { timestamps: true }
)

userSchema.plugin(paginator)

export default mongoose.model("User", userSchema)
