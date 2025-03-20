import CustomRouter from "../utils/CustomRouter.js";
import passportCb from "../middlewares/passportCb.mid.js";
import {
  register,
  login,
  signout,
  online,
  nodemailerController,
  verify,
} from "../controllers/auth.controller.js";

class AuthRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.create("/signout", ["PUBLIC", "USER"], signout);
    this.create("/online", ["PUBLIC", "USER"], online);
    this.read("/nodemailer/:email", ["PUBLIC"], nodemailerController);
    this.create("/verify", ["PUBLIC"], verify);
  };
}

const authRouter = new AuthRouter();
export default authRouter.getRouter();
