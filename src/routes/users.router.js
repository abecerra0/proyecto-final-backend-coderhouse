import { Router } from "express";
import User from "../models/users.model.js";
import passportCb from "../middlewares/passportCb.mid.js";

const usersRouter = Router();

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await User.create(data);
    return res.status(201).json({ message: "Creado", response });
  } catch (error) {
    next(error);
  }
};

const readOneUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const reesponse = await User.findById(uid);
    return res.status(200).json({ message: "Leido por Id", response });
  } catch (error) {
    next(error);
  }
};

const updateOneUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const opt = { new: true };
    const response = await User.findByIdAndUpdate(uid, data, opt);
    return res.status(200).json({ message: "Actualizar", response });
  } catch (error) {
    return next(error);
  }
};

const destroyOneUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await User.findByIdAndDelete(uid);
    return res.status(200).json({ message: "Eliminado", response });
  } catch (error) {
    return next(error);
  }
};

usersRouter.post("/", createUser);
usersRouter.get("/:uid", readOneUser);
usersRouter.put("/:uid", passportCb("jwt-auth"), updateOneUser);
usersRouter.delete("/:uid", passportCb("jwt-auth"), destroyOneUser);

export default usersRouter;
