import { usersManager } from "../dao/index.dao.js";
import UserDto from "../dto/users.dto.js";

class UsersService {
  create = async (data) => await usersManager.create(new UserDto(data));
  read = async (data) => await usersManager.read(data);
  readById = async (id) => await usersManager.readById(id);
  updateById = async (id, data) => await usersManager.updateById(id, data);
  destroyById = async (id) => await usersManager.destroyById(id);
  verify = async (email, code) => {
    const user = await usersManager.readBy({ email });
    const verify = code === user?.verifyCode;
    if (verify) {
      await usersManager.updateById(user._id, { verify });
    }
    return verify;
  };
}

const usersService = new UsersService();
export default usersService;
