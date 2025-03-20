import nodemailerUtil from "../utils/nodemailer.util.js";
import usersService from "../services/users.service.js";

const register = async (req, res) => {
  const user = req.user;
  res.json201(user);
};
const login = async (req, res) => {
  const { token, user } = req;
  const opts = { maxAge: 60 * 60 * 24 * 7 * 1000 };
  res.cookie("token", token, opts).json200(user, "Logged in");
};
const signout = (req, res) =>
  res.clearCookie("token").json200(null, "Signed out");
const online = (req, res) => res.json200(null, "It's online");

const nodemailerController = async (req, res) => {
  const { email } = req.params;
  await nodemailerUtil(email);
  res.json200(null, "Verify email");
};

const verify = async (req, res) => {
  const { email, code } = req.body;
  const user = await usersService.verify({ email, code });
  if (!user) {
    res.json403();
  } else {
    res.json200(null, "Verificado");
  }
};

export { register, login, signout, online, nodemailerController, verify };
