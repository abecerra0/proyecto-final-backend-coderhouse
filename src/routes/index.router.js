import { Router } from "express";
import productsRouter from "./products.routes.js";
import usersRouter from "./users.router.js";
import cookiesRouter from "./cookies.router.js";
import sessionsRouter from "./sessions.router.js";
import authRouter from "./auth.router.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/users", usersRouter);
router.use("/cookies", cookiesRouter);
router.use("/sessions", sessionsRouter);
router.use("/auth", authRouter);

export default router;
