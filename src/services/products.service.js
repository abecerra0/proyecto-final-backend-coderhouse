import { productsManager } from "../dao/index.dao.js";
import ProductDto from "../dto/products.dto.js";

class ProductsService {
  create = async (data) => await productsManager.create(new ProductDto(data));
  read = async (data) => await productsManager.read(data);
  readById = async (id) => await productsManager.readById(id);
  updateById = async (id, data) => await productsManager.updateById(id, data);
  destroyById = async (id) => await productsManager.destroyById(id);
}

const productsService = new ProductsService();
export default productsService;
