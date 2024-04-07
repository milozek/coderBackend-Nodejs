import mongoose from "mongoose";

const CartsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 }
      }
    ]
  },
  { timestamps: true }
);

CartsSchema.pre("findOne", function () {
  this.populate("products.product");
});

export default mongoose.model("Cart", CartsSchema);
