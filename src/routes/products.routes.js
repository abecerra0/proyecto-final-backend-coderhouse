import CustomRouter from "../utils/CustomRouter.js";
import Product from "../models/products.model.js";
import passportCb from "../middlewares/passportCb.mid.js";

const createProduct = async (req, res) => {
  const data = req.body;
  data.owner_id = req.user_id;
  const response = await Product.create(data);
  return res.status(201).json({ message: "Creado", response });
};

const readAllProducts = async (req, res) => {
  const response = await Product.find();
  return res.status(200).json({ message: "Leyendo", response });
};

const readOneProduct = async (req, res) => {
  const { pid } = req.params;
  const response = await Product.findById(pid);
  return res.status(200).json({ message: "Leer por identificacion", response });
};

const updateOneProduct = async (req, res) => {
  const { pid } = req.params;
  const data = req.body;
  const opt = { new: true };
  const response = await Product.findByIdAndUpdate(pid, data, opt);
  return res.status(200).json({ message: "Actualizar", response });
};

const destroyOneProduct = async (req, res) => {
  const { pid } = req.params;
  const response = await Product.findByIdAndDelete(pid);
  return res.status(200).json({ message: "Eliminado", response });
};

class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createProduct);
    this.read("/", ["PUBLIC"], readAllProducts);
    this.read("/:pid", ["PUBLIC"], readOneProduct);
    this.update("/:pid", ["ADMIN"], updateOneProduct);
    this.destroy("/:pid", ["ADMIN"], destroyOneProduct);
  };
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
