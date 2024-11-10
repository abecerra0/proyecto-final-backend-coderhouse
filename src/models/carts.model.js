import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
  ],
});

cartSchema.pre("findOne", function (next) {
  this.populate("products.product");
  next();
});
const CartsModel = mongoose.model("carts", cartSchema);
export default CartsModel;
