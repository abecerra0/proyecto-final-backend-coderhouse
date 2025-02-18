import { Schema, model, Types } from "mongoose";

const Collection = "products";
const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
  onsale: {
    type: Boolean,
    default: false,
  },
  owner_id: {
    type: Types.ObjectId,
    ref: "users",
    require: true,
  },
});

const Product = model(Collection, schema);
export default Product;
