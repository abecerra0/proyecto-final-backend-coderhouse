import crypto from "crypto";
import argsUtil from "../utils/args.util.js";
import { createHash } from "../utils/hash.util.js";
const { pers } = argsUtil;

class UserDto {
  constructor(data) {
    if (pers !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.name = data.name;
    this.date = data.date;
    this.email = data.email;
    this.password = createHash(data.password);
    this.avatar =
      data.avatar || "https://cdn-icons-png.flaticon.com/512/266/266033.png";
    this.role = data.role || "USER";
    this.verifyCode = data.verifyCode;
    this.verify = data.verify || false;
    if (pers !== "mongo") {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default UserDto;
