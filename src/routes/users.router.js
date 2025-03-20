import CustomRouter from "../utils/CustomRouter.js";
import User from "../models/users.model.js";
import passportCb from "../middlewares/passportCb.mid.js";

const createUser = async (req, res) => {
  const data = req.body;
  const response = await User.create(data);
  return res.status(201).json({ message: "Creado", response });
};

const readOneUser = async (req, res) => {
  const { uid } = req.params;
  const reesponse = await User.findById(uid);
  return res.status(200).json({ message: "Leido por Id", response });
};

const updateOneUser = async (req, res) => {
  const { uid } = req.params;
  const data = req.body;
  const opt = { new: true };
  const response = await User.findByIdAndUpdate(uid, data, opt);
  return res.status(200).json({ message: "Actualizar", response });
};

const destroyOneUser = async (req, res) => {
  const { uid } = req.params;
  const response = await User.findByIdAndDelete(uid);
  return res.status(200).json({ message: "Eliminado", response });
};

class UsersRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["PUBLIC"], createUser);
    this.read("/:uid", ["USER", "ADMIN"], readOneUser);
    this.update(
      "/:uid",
      ["USER", "ADMIN"],
      passportCb("jwt-auth"),
      updateOneUser
    );
    this.destroy(
      "/:uid",
      ["USER", "ADMIN"],
      passportCb("jwt-auth"),
      destroyOneUser
    );
  };
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
