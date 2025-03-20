import CustomRouter from "../utils/CustomRouter.js";
import passportCb from "../middlewares/passportCb.mid.js";

const createCart = async (req, res) => {
  try {
    const nuevoCarrito = await CartsModel.create({ products: [] });
    res.json(nuevoCarrito);
  } catch (error) {
    res.status(500).send("Error al crear carrito");
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await CartsModel.findById(req.params.cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });
    res.status(200).json({ status: "ok", payload: cart });
  } catch (error) {
    res.status(500).send("Error al obtener el carrito");
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity || 1;
    const cart = await CartsModel.findById(cid);
    if (!cart) return res.status(404).send("Carrito no encontrado");

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === pid
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }
    await cart.save();
    res.json(cart.products);
  } catch (error) {
    res.status(500).send("Error al agregar productos al carrito");
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await CartsModel.findById(cid);
    if (!cart) return res.status(404).send("Carrito no encontrado");

    cart.products = cart.products.filter((p) => p.product.toString() !== pid);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).send("Error al eliminar el producto del carrito");
  }
};

const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = await CartsModel.findByIdAndUpdate(
      cid,
      { products },
      { new: true }
    );
    if (!cart) return res.status(404).send("Carrito no encontrado");
    res.json(cart);
  } catch (error) {
    res.status(500).send("Error al actualizar el carrito");
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    if (isNaN(quantity)) return res.status(400).send("Cantidad requerida");

    const cart = await CartsModel.findById(cid);
    if (!cart) return res.status(404).send("Carrito no encontrado");

    const product = cart.products.find((p) => p.product.toString() === pid);
    if (!product)
      return res.status(404).send("Producto no encontrado en el carrito");

    product.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).send("Error al actualizar la cantidad del producto");
  }
};

const deleteCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartsModel.findByIdAndDelete(cid);
    if (!cart) return res.status(404).send("Carrito no encontrado");
    res.json({ message: "Carrito eliminado" });
  } catch (error) {
    res.status(500).send("Error al eliminar el carrito");
  }
};

class CartsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", passportCb("jwt-adm"), createCart);
    this.read("/:cid", getCartById);
    this.create("/:cid/product/:pid", passportCb("jwt-adm"), addProductToCart);
    this.destroy(
      "/:cid/product/:pid",
      passportCb("jwt-adm"),
      removeProductFromCart
    );
    this.update("/:cid", passportCb("jwt-adm"), updateCart);
    this.update(
      "/:cid/product/:pid",
      passportCb("jwt-adm"),
      updateProductQuantity
    );
    this.destroy("/:cid", passportCb("jwt-adm"), deleteCart);
  };
}

const cartRouter = new CartsRouter();
export default cartRouter.getRouter();
