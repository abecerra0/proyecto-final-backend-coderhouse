import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://ayelenrbecerra:1234@cluster0.wq1ig.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.log("Error", error));
