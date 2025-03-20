import { connect } from "mongoose";

async function dbConnect() {
  try {
    const uri = process.env.LINK_MONGO; // Debería obtener la URI de la variable de entorno
    if (!uri) {
      console.error(
        "La URI de MongoDB no está definida en las variables de entorno"
      );
      return;
    }
    await connect(uri);
  } catch (error) {
    console.log(error.message);
  }
}
export default dbConnect;
