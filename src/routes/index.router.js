import CustomRouter from "../utils/CustomRouter.js";
import productsRouter from "./products.routes.js";
import usersRouter from "./users.router.js";
import cookiesRouter from "./cookies.router.js";
import sessionsRouter from "./sessions.router.js";
import authRouter from "./auth.router.js";

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.use("/cookies", cookiesRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/auth", authRouter);
  };
}

const router = new ApiRouter();
export default router.getRouter();
