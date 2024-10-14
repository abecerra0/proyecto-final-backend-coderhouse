import { Router } from "express";
const router = Router();

//importamos el product manager y llamamos al método
import ProductManager from "../manager/product.manager.js";
const manager = new ProductManager("./src/data/products.json");
router.get("/products", async (req, res) => {
  const products = await manager.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realtimeproducts");
});

export default router;
