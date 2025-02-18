import { Router } from "express";
import ProductsModel from "../models/products.model.js";
import CartModel from "../models/carts.model.js";

const router = Router();

router.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page || 1;

  try {
    const productsPaginated = await ProductsModel.paginate({}, { limit, page });

    if (!productsPaginated) {
      return res.status(404).json({ error: "No hay productos! " });
    }

    const products = productsPaginated.docs.map((product) =>
      product.toObject()
    );

    res.render("index", { products });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error al obtener productos");
  }
});

router.get("/products/:pid", async (req, res) => {
  let productId = req.params.pid;

  try {
    const producto = await ProductsModel.findById(productId);

    if (!producto) {
      return res
        .status(404)
        .json({ error: "No existe un producto con el id " + productId });
    }

    res.render("product", { producto: producto.toObject() });
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
});

router.get("/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;
  try {
    const carrito = await CartModel.findById(cartId);

    if (!carrito) {
      return res
        .status(404)
        .json({ error: "No existe un carrito con el id " + cartId });
    }

    const productosEnCarrito = carrito.products.map((p) => ({
      product: p.product.toObject(),
      quantity: p.quantity,
    }));

    console.log(productosEnCarrito);

    res.render("cart", { productos: productosEnCarrito });
  } catch (error) {
    console.error("Error al obtener el carrito: ", error);
    res.status(500).send("Error al obtener carrito por id");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realtimeproducts");
});

export default router;
