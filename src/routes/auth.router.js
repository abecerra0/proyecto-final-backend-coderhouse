import { Router } from "express";
import passport from "passport";
import isAuth from "../middlewares/isAuth.mid.js";
import passportCb from "../middlewares/passportCb.mid.js";

const authRouter = Router();

const register = async (req, res, next) => {
  try {
    const user = req.user;
    return res
      .status(201)
      .json({ message: "Usuario Registrado", response: user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { token, user } = req;
    const opts = { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true };
    return res
      .status(200)
      .cookie("token", token, opts)
      .json({ message: "Sesion Iniciada", response: user });
  } catch (error) {
    next(error);
  }
};

const signout = (req, res, next) => {
  try {
    return res
      .status(200)
      .clearCookie("token")
      .json({ message: "Sesion Cerrada" });
  } catch (error) {
    next(error);
  }
};

const online = (req, res, next) => {
  try {
    return res.status(200).json({ message: "Esta en linea", response: true });
  } catch (error) {
    next(error);
  }
};

authRouter.post("/register", passportCb("register"), register);
authRouter.post("/login", passportCb("local"), login);
authRouter.post("/signout", passportCb("jwt-auth"), signout);
authRouter.post("/online", passportCb("jwt-auth"), online);

export default authRouter;
