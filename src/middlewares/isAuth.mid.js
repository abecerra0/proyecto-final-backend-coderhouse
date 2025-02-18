import User from "../models/users.model.js";
import { decodeToken } from "../utils/token.util.js";

const isAuth = async (req, res, next) => {
  try {
    const data = decodeToken(req.headers);
    const { email } = data;
    const User = await User.findOne({ email });
    if (!User) {
      const error = new Error("Invalido");
      error.statusCode = 401;
      throw error;
    }
    req.User = User;
    next();
  } catch (error) {
    next(error);
  }
};
export default isAuth;
