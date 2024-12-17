import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  createProductRequest,
  getProductsRequest,
  deleteProductRequest,
  getProductRequest,
  updateProductRequest,
  updateProductRequestNoUpdateImage,
} from "../api/products";

const ProductsContext = createContext();

// Hook para usar el contexto de productos
export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts debe estar dentro de un ProductsProvider");
  }
  return context;
};

export function ProductsProvider({ children }) {
  // Estado para los productos en la tienda
  const [products, setProducts] = useState([]);
  // Estado para el carrito
  const [cart, setCart] = useState([]);

  // Función para crear un producto
  const createProduct = async (product) => {
    try {
      await createProductRequest(product);
      getProducts(); // Actualizamos los productos
    } catch (error) {
      console.log(error);
    }
  };

  // Función para obtener todos los productos de la tienda
  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data); // Guardamos los productos en el estado
    } catch (error) {
      console.log(error);
    }
  };

  // Función para eliminar un producto
  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      if (res.status === 200) {
        setProducts(products.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Función para obtener un producto específico
  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Función para actualizar un producto
  const updateProduct = async (id, product) => {
    try {
      await updateProductRequest(id, product);
      getProducts(); // Actualizamos los productos
    } catch (error) {
      console.log(error);
    }
  };

  // Función para actualizar un producto sin actualizar la imagen
  const updateProductNoUpdateImage = async (id, product) => {
    try {
      await updateProductRequestNoUpdateImage(id, product);
      getProducts(); // Actualizamos los productos
    } catch (error) {
      console.log(error);
    }
  };

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateCartQuantity = (id, quantity) => {
    if (quantity < 1) return; // No permitir cantidades negativas
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Función para obtener los productos del carrito
  const getCart = () => {
    return cart;
  };

  return (
    <ProductsContext.Provider
      value={{
        products, // Productos de la tienda
        cart, // Productos en el carrito
        createProduct, // Crear un producto
        getProducts, // Obtener productos de la tienda
        deleteProduct, // Eliminar un producto
        getProduct, // Obtener un producto específico
        updateProduct, // Actualizar un producto
        updateProductNoUpdateImage, // Actualizar producto sin cambiar la imagen
        addToCart, // Agregar producto al carrito
        removeFromCart, // Eliminar producto del carrito
        updateCartQuantity, // Actualizar la cantidad del carrito
        getCart, // Obtener los productos del carrito
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

ProductsProvider.propTypes = {
  children: PropTypes.any,
};
