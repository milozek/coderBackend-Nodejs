import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const ProductsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String },
    price: { type: Number, required: true },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
    owner: {
      email: { type: String, default: "admin@admin.com" },
      role: { type: String, default: "admin" },
    },
  },
  { timestamps: true }
);

ProductsSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", ProductsSchema);
