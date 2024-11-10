import ProductsModel from "../models/products.model.js";

class ProductManager {
  async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    try {
      const skip = (page - 1) * limit;

      let queryOptions = {};

      if (query) {
        queryOptions = { category: query };
      }

      const sortOptions = {};

      if (sort) {
        if (sort === "asc" || sort === "desc") {
          sortOptions.price = sort === "asc" ? 1 : -1;
        }
      }

      const producto = await ProductsModel.find(queryOptions)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

      const totalProduct = await ProductsModel.countDocuments(queryOptions);
      const totalPages = Math.ceil(totalProduct / limit);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;

      return {
        docs: producto,
        totalPages,
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage
          ? `/api/products?limit=${limit}&page=${
              page - 1
            }&sort=${sort}&query=${query}`
          : null,
        nextLink: hasNextPage
          ? `/api/products?limit=${limit}&page=${
              page + 1
            }&sort=${sort}&query=${query}`
          : null,
      };
    } catch (error) {
      console.log("Error al obtener los productos", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const producto = await ProductsModel.findById(id);
      if (!producto) {
        console.log("Producto no encontrado");
        return null;
      }
      console.log("Producto encontrado");
      return producto;
    } catch (error) {
      console.log("Error al traer un producto por id");
    }
  }

  async updateProduct(id, productoActualizado) {
    try {
      const update = await ProductsModel.findByIdAndUpdate(
        id,
        productoActualizado
      );
      if (!update) {
        console.log("No se encuentra el producto");
        return null;
      }
      console.log("Producto actualizado con exito");
      return update;
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      const update = await ProductsModel.findByIdAndDelete(id);
      if (!update) {
        console.log("No se encuentra el producto");
        return null;
      }
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.log("Error al eliminar el producto", error);
      throw error;
    }
  }
}

export default ProductManager;
