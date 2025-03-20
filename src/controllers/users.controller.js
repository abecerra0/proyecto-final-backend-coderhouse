import usersService from "../services/users.service.js";

const createUser = async (req, res) => {
  const data = req.body;
  const response = await usersService.create(data);
  res.json201(response);
};
const readAllUsers = async (req, res) => {
  const response = await usersService.read();
  res.json200(response);
};
const readOneUser = async (req, res) => {
  const { user_id } = req.params;
  const response = await usersService.readById(user_id);
  if (!response) {
    res.json404();
  } else {
    res.json200(response);
  }
};
const updateOneUser = async (req, res) => {
  const { user_id } = req.params;
  const data = req.body;
  const response = await usersService.updateById(user_id, data);
  if (!response) {
    res.json404();
  } else {
    res.json200(response);
  }
};
const destroyOneUser = async (req, res) => {
  const { user_id } = req.params;
  const response = await usersService.destroyById(user_id);
  if (!response) {
    res.json404();
  } else {
    res.json200(response);
  }
};

export { createUser, readAllUsers, readOneUser, updateOneUser, destroyOneUser };
