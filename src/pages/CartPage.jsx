import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, updateCartQuantity } = useProducts(); // Usamos las funciones del contexto
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => {
      acc[item._id] = item.quantity; // Cantidad inicial de cada producto
      return acc;
    }, {})
  );

  const server = import.meta.env.VITE_BASE_URL + "/img/";

  // Manejar cambios en la cantidad
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return; // Evitar cantidades negativas o cero
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
    // Actualizamos la cantidad en el carrito global
    updateCartQuantity(id, quantity);
  };

  // Eliminar un producto del carrito
  const handleRemoveFromCart = (id) => {
    setQuantities((prev) => {
      const { [id]: _, ...rest } = prev; // Eliminar el producto del estado local
      return rest;
    });
    removeFromCart(id); // Eliminar el producto del carrito global
  };

  return (
    <div className="flex">
      <Navbar />

      <div className="ml-64 p-4 w-full">
        <Link
          to="/"
          className="text-yellow-500 font-bold hover:text-yellow-300 px-4 py-2 mt-4 inline-block"
        >
          ⇐ Volver a la página principal
        </Link>

        <h1 className="text-2xl font-bold mt-8">Carrito de Compras</h1>

        {cart.length === 0 ? (
          <div className="mt-4">
            <p>Tu carrito está vacío.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {cart.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                {/* Sección de la imagen y detalles del producto */}
                <div className="flex items-center">
                  <img
                    src={`${server}${product.image}`}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h2 className="text-xl text-white">{product.name}</h2>
                    <p className="text-gray-400">Precio: ${product.price}</p>
                  </div>
                </div>

                {/* Sección de cantidad y control */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        product._id,
                        quantities[product._id] - 1
                      )
                    }
                    className="bg-red-500 text-white p-2 rounded-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantities[product._id]}
                    onChange={(e) =>
                      handleQuantityChange(
                        product._id,
                        parseInt(e.target.value)
                      )
                    }
                    className="w-16 text-center bg-gray-700 text-white rounded-lg"
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        product._id,
                        quantities[product._id] + 1
                      )
                    }
                    className="bg-green-500 text-white p-2 rounded-lg"
                  >
                    +
                  </button>
                </div>

                {/* Botón para eliminar producto */}
                <button
                  onClick={() => handleRemoveFromCart(product._id)}
                  className="text-red-500 hover:text-red-300"
                >
                  Eliminar
                </button>
              </div>
            ))}

            {/* Resumen del carrito */}
            <div className="mt-8 flex justify-between items-center bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl text-white font-bold">Total:</h2>
              <p className="text-2xl text-yellow-500 font-bold">
                $
                {cart.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
              </p>
            </div>

            {/* Botón de checkout */}
            <div className="mt-8 flex justify-end">
              <Link
                to="/checkout"
                className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 rounded-lg font-bold"
              >
                Proceder al pago
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
