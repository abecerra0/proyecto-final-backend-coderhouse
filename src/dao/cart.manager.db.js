import CartModel from "../models/carts.model.js";

class CartManager {
  async crearCarrito() {
    try {
      const nuevoCarrito = new CartModel({ products: [] });
      await nuevoCarrito.save();
      return nuevoCarrito;
    } catch (error) {
      console.log("Error al crear un nuevo carrito de compra");
    }
  }

  async getCarritoById(cartId) {
    try {
      const carrito = await CartModel.findById(cartId);
      if (!carrito) {
        console.log("No existe ese carrito con el ID");
        return null;
      }
      return carrito;
    } catch (error) {
      console.log("Error al traer el carrito", error);
    }
  }

  async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
    try {
      const carrito = await this.getCarritoById(cartId);
      const existeProducto = carrito.products.find(
        (item) => item.product.toString() === productId
      );
      if (existeProducto) {
        existeProducto.quantity += quantity;
      } else {
        carrito.products.push({ product: productId, quantity });
      }
      carrito.markModified("products");
      await carrito.save();
      return carrito;
    } catch (error) {
      console.log("Error al agregar un producto", error);
    }
  }

  async eliminarProductoDelCarrito(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = cart.products.filter(
        (item) => item.product._id.toString() !== productId
      );

      await cart.save();
      return cart;
    } catch (error) {
      console.error(
        "Error al eliminar el producto del carrito en el gestor",
        error
      );
      throw error;
    }
  }

  async actualizarCarrito(cartId, updatedProducts) {
    try {
      const cart = await CartModel.findById(cartId);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      cart.products = updatedProducts;
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error al actualizar el carrito en el gestor", error);
      throw error;
    }
  }

  async actualizarCantidadProducto(cartId, productId, quantity) {
    try {
      const cart = await CartModel.findById(cartId);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      cart.products = cart.products.map((p) => {
        if (p.product && p.product._id.toString() === productId) {
          p.product.quantity = quantity;
        }
        return p;
      });

      cart.markModified("products");

      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error al actualizar el carrito en el gestor", error);
      throw error;
    }
  }

  async eliminarProductosDelCarrito(cartId) {
    try {
      const cart = await CartModel.findById(cartId);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      cart.products = [];

      cart.markModified("products");

      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error al eliminar los productos del carrito", error);
      throw error;
    }
  }
}
export default CartManager;
