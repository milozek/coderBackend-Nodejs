import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema(
  {
    name: { type: String },
    reference: { type: String },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: "user" },
    age: { type: Number, required: false },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    documents: [documentSchema],
    last_connection: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
