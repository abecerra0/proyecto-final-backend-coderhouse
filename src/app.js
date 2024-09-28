import express from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
const app = express();
const PUERTO = 8080;
// Middlewares
app.use(express.json()); // Nos permite leer archivos JSON

//RUTAS
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

//Servidor en el puerto 8080.
app.listen(PUERTO, () => {
  console.log(`Escuchando en el http://localhost:${PUERTO}`);
});
