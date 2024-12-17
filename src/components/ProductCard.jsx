import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart, onEditProduct, onDeleteProduct }) {
  const server = import.meta.env.VITE_BASE_URL + "/img/";

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      {/* Imagen del producto */}
      <img
        src={`${server}${product.image}`}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      {/* Información del producto */}
      <h2 className="text-xl font-bold text-white mb-2">{product.name}</h2>
      <p className="text-gray-400 mb-2">Precio: ${product.price}</p>
      <p className="text-gray-400 mb-4">
        Stock disponible: {product.year || "N/A"}
      </p>

      <div className="flex justify-between">
        {/* Botón para agregar al carrito */}
        {onAddToCart && (
          <button
            onClick={() => onAddToCart(product)}
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg font-bold"
          >
            Agregar al carrito
          </button>
        )}

        {/* Botones de acciones para productos (Editar y Eliminar) */}
        {onEditProduct && (
          <Link
            to={`/products/${product._id}`}
            className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg font-bold"
          >
            Editar
          </Link>
        )}
        {onDeleteProduct && (
          <button
            onClick={() => onDeleteProduct(product._id)}
            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg font-bold"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
