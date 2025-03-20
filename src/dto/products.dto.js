import crypto from "crypto";
import argsUtil from "../utils/args.util.js";
const { pers } = argsUtil;

class ProductDto {
  constructor(data) {
    if (pers !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.title = data.title;
    this.description = data.description;
    this.category = data.category;
    this.image = data.image;
    this.price = data.price;
    this.stock = data.stock;
    this.onsale = data.onsale;
    this.owner_id = data.owner_id;
    if (pers !== "mongo") {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default ProductDto;
