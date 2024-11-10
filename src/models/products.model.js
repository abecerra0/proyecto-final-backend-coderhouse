import mongoose from "mongoose";
import moongosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;
const productsCollection = "products";

const productsSchema = new Schema({
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
  thumbnail: {
    type: String,
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
});

productsSchema.plugin(moongosePaginate);
const ProductsModel = mongoose.model(productsCollection, productsSchema);

export default ProductsModel;
