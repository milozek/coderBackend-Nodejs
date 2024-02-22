import mongoose, { Schema } from "mongoose"
import paginator from "mongoose-paginate-v2"

const userSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String },
        dni: { type: String, required: false, index: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, default: 0 },
        password: { type: String },

        status: { type: Boolean, default: true },
        role: {
            type: String,
            required: false,
            default: "user",
            enum: ["user", "premium_user", "admin"],
        },
        orders: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Order",
                },
            ],
            required: false,
            default: [],
        },
    },
    { timestamps: true }
)

userSchema.plugin(paginator)

export default mongoose.model("User", userSchema)
