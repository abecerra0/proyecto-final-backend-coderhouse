import express from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
const app = express();
const PUERTO = 8080;
import "./database.js";

// Middlewares
app.use(express.json()); // Nos permite leer archivos JSON
app.use(express.static("./src/public"));

///Express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

//Servidor en el puerto 8080.
const httpServer = app.listen(PUERTO, () => {
  console.log(`Escuchando en el http://localhost:${PUERTO}`);
});

const io = new Server(httpServer);

import ProductManager from "./dao/product.manager.js";
const manager = new ProductManager("./src/data/products.json");

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  socket.emit("products", await manager.getProducts());

  socket.on("productoNuevo", async (product) => {
    console.log("Nuevo producto recibido:", product);
    await manager.addProduct(product);
    io.sockets.emit("products", await manager.getProducts());
  });

  socket.on("eliminarProducto", async (idProducto) => {
    await manager.deleteProduct(idProducto);
    io.sockets.emit("products", await manager.getProducts());
  });
});
