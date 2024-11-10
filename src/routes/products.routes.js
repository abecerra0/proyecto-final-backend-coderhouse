import express from "express";
import ProductManager from "../dao/product.manager.db.js";

const manager = new ProductManager();
const router = express.Router();

//1) La ruta raíz GET / deberá listar todos los productos de la base.
//(Incluyendo la limitación ?limit del desafío anterior).
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const page = req.query.page;
    const sort = req.query.sort;
    const query = req.query.query;

    const productos = await manager.getProducts({
      limit,
      page,
      sort,
      query,
    });

    if (limit) {
      res.json(productos.slice(0, limit));
    } else {
      res.json(productos);
    }
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

//2) La ruta GET /:pid deberá traer sólo el producto con el id proporcionado
router.get("/:pid", async (req, res) => {
  let id = req.params.pid;

  try {
    const productoBuscado = await manager.getProductById(id);

    if (!productoBuscado) {
      res.send("Producto no encontrado");
    } else {
      res.json(productoBuscado);
    }
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
});

//3) La ruta raíz POST / deberá agregar un nuevo producto
router.post("/", async (req, res) => {
  const nuevoProducto = req.body;

  try {
    await manager.addProduct(nuevoProducto);
    res.status(201).send("Producto agregado exitosamente");
  } catch (error) {
    res.status(500).send("Error al agregar producto");
  }
});

//4) La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body.
//NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.

router.put("/:pid", async (req, res) => {
  const { pid } = req.params; // Obtener el ID del producto desde los parámetros de la URL
  const updateData = req.body;
  const product = await manager.getProductById(pid);
  if (!product) {
    return res
      .status(404)
      .json({ status: "error", message: "Producto no encontrado" });
  }
  // Evitar que se actualice el campo 'id' si está en los datos enviados
  if (updateData.id) {
    return res
      .status(400)
      .json({ status: "error", message: "Cannot update 'id' field" });
  }
  const updatedProduct = { ...product, ...updateData };
  await manager.updateProduct(pid, updatedProduct);
  res.status(200).json({ status: "ok", payload: updatedProduct });
});

//5) La ruta DELETE /:pid deberá eliminar el producto con el pid indicado.
router.delete("/:pid", async (req, res) => {
  let id = req.params.pid;

  try {
    await manager.deleteProduct(id);
    res.send("Producto eliminado");
  } catch (error) {
    res.status(500).send("Error al querer borrar un producto");
  }
});

export default router;
