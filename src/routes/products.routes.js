import { Router } from "express";
import Product from "../models/products.model.js";
import passportCb from "../middlewares/passportCb.mid.js";

const productsRouter = Router();

const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    data.owner_id = req.user_id;
    const response = await Product.create(data);
    return res.status(201).json({ message: "Creado", response });
  } catch (error) {
    next(error);
  }
};

const readAllProducts = async (req, res, next) => {
  try {
    const response = await Product.find();
    return res.status(200).json({ message: "Leyendo", response });
  } catch (error) {
    next(error);
  }
};

const readOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await Product.findById(pid);
    return res
      .status(200)
      .json({ message: "Leer por identificacion", response });
  } catch (error) {
    next(error);
  }
};

const updateOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const opt = { new: true };
    const response = await Product.findByIdAndUpdate(pid, data, opt);
    return res.status(200).json({ message: "Actualizar", response });
  } catch (error) {
    next(error);
  }
};

const destroyOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await Product.findByIdAndDelete(pid);
    return res.status(200).json({ message: "Eliminado", response });
  } catch (error) {
    return next(error);
  }
};

productsRouter.post("/", passportCb("jwt-adm"), createProduct);
productsRouter.get("/", readAllProducts);
productsRouter.get("/:pid", readOneProduct);
productsRouter.put("/:pid", passportCb("jwt-adm"), updateOneProduct);
productsRouter.delete("/:pid", passportCb("jwt-adm"), destroyOneProduct);

export default productsRouter;
