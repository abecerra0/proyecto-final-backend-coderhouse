import express from "express";
const router = express.Router();
import CartManager from "../manager/cart.manager.js";
const manager = new CartManager("./src/data/carts.json");

//1) La ruta raíz POST / deberá crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const nuevoCarrito = await manager.crearCarrito();
    res.json(nuevoCarrito);
  } catch (error) {
    res.status(500).send("Error al crear carrito");
  }
});

//2) La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await manager.getCarritoById(Number(cid));
  if (!cart)
    return res
      .status(404)
      .json({ status: "error", message: "Carrito no encontrado" });
  res.status(200).json({ status: "ok", payload: cart });
});

//3) La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado
router.post("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  let quantity = req.body.quantity || 1;

  try {
    const actualizarCarrito = await manager.agregarProductoAlCarrito(
      parseInt(cartId),
      parseInt(productId),
      quantity
    );

    res.json(actualizarCarrito.products);
  } catch (error) {
    res.status(500).send("Error al agregar productos al carrito");
  }
});

export default router;
