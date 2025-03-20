import crypto from "crypto";
import argsUtil from "../utils/args.util.js";
const { pers } = argsUtil;

class CartDto {
  constructor(data) {
    if (pers !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.product_id = data.product_id;
    this.user_id = data.user_id;
    this.quantity = data.quantity || 1;
    this.state = data.state || "reserved";
    if (pers !== "mongo") {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default CartDto;
