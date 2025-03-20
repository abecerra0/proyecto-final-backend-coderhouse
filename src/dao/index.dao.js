import dbConnect from "../utils/dbConnect.util.js";
import argsUtil from "../utils/args.util.js";
const { pers } = argsUtil;

let dao = {};

console.log(pers + " database");
switch (pers) {
  case "memory":
    {
      const { productsManager, usersManager, cartsManager } = await import(
        "./memory/manager.memory.js"
      );
      dao = { productsManager, usersManager, cartsManager };
    }
    break;
  case "fs":
    {
      const { productsManager, usersManager, cartsManager } = await import(
        "./fs/manager.fs.js"
      );
      dao = { productsManager, usersManager, cartsManager };
    }
    break;
  default:
    {
      await dbConnect();
      const { productsManager, usersManager, cartsManager } = await import(
        "./mongo/manager.mongo.js"
      );
      dao = { productsManager, usersManager, cartsManager };
    }
    break;
}

const { productsManager, usersManager, cartsManager } = dao;
export { productsManager, usersManager, cartsManager };
export default dao;
