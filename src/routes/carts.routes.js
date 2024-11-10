import express from "express";
import CartManager from "../dao/cart.manager.db.js";

const router = express.Router();

const manager = new CartManager();

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
  const cart = await manager.getCarritoById(cid);
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
      cartId,
      productId,
      quantity
    );

    res.json(actualizarCarrito.products);
  } catch (error) {
    res.status(500).send("Error al agregar productos al carrito");
  }
});

//4) DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
router.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body.quantity || 1;
  try {
    const carritoActualizado = await manager.eliminarProductoDelCarrito(
      cid,
      pid
    );
    res.json(carritoActualizado);
  } catch (error) {
    res.status(500).send("Error al eliminar el producto del carrito");
  }
});

//5) PUT api/carts/:cid deberá actualizar todos los productos del carrito con un arreglo de productos.
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    const carritoActualizado = await manager.actualizarCarrito(cid, products);
    res.json(carritoActualizado);
  } catch (error) {
    res.status(500).send("Error al actualizar el carrito");
  }
});

//6) PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por
//cualquier cantidad pasada desde req.body
router.put("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  if (isNaN(quantity)) {
    return res.status(400).send("Cantidad requerida");
  }
  try {
    const carritoActualizado = await manager.actualizarCantidadProducto(
      cid,
      pid,
      quantity
    );
    res.json(carritoActualizado);
  } catch (error) {
    res.status(500).send("Error al actualizar la cantidad del producto");
  }
});

//7)DELETE api/carts/:cid deberá eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const carritoActualizado = await manager.eliminarProductosDelCarrito(cid);
    res.json(carritoActualizado);
  } catch (error) {
    res.status(500).send("Error al actualizar la cantidad del producto");
  }
});

export default router;
