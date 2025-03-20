import "../src/utils/env.util.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//import MongoStore from "connect-mongo";
//import { engine } from "express-handlebars";
import router from "./routes/index.router.js";
import errorHandler from "./middlewares/errorHandler.mid.js";
import pathHandler from "./middlewares/pathHandler.mid.js";
import dbConnect from "./utils/dbConnect.util.js";

const server = express();
const port = 8080;
const ready = async () => {
  console.log("Funcionando puerto " + port);
  await dbConnect();
  console.log("Mongo conectado");
};
server.listen(port, ready);

//server.engine("handlebars", engine());
//server.set("view engine", "handlebars");
//server.set("views", __dirname + "/src/views");

server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(cookieParser(process.env.COOKIE_KEY));

server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
