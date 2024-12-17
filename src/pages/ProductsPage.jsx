import React from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar"; // Importamos la barra de navegación
import { Link } from "react-router-dom"; // Importamos el componente Link para navegación

function ProductsPage() {
  const { products, deleteProduct } = useProducts();

  return (
    <div className="flex">
      {/* Navbar fija a la izquierda */}
      <Navbar />

      {/* Contenido principal */}
      <div className="ml-64 p-4 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Gestión de Productos</h1>
          <Link
            to="/add-product"
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400 transition"
          >
            Agregar Producto
          </Link>
        </div>

        {/* Cuadros de productos en disposición horizontal */}
        <div className="flex overflow-x-auto gap-6">
          {products.map((product) => (
            <div key={product._id} className="flex-shrink-0">
              <ProductCard
                product={product}
                onEditProduct={true} // Muestra el botón de Editar
                onDeleteProduct={deleteProduct} // Muestra el botón de Eliminar
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
