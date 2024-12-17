import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import Navbar from "../components/Navbar"; // Asegúrate de importar el Navbar

function ProductDetailPage() {
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const { getProduct, addToCart } = useProducts(); // Usar el contexto de productos
  const [product, setProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const server = import.meta.env.VITE_BASE_URL + "/img/"; // URL base de las imágenes

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProduct(id); // Obtener los datos del producto
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [id, getProduct]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna el estado del menú
  };

  const handleAddToCart = () => {
    addToCart(product); // Agregar el producto al carrito
    alert("Producto agregado al carrito");
  };

  if (!product) return <div>Cargando...</div>; // Mostrar un mensaje de carga si no se encuentra el producto

  return (
    <div className="bg-[#210303] text-white min-h-screen flex">
      {/* Barra lateral fija con el Navbar */}
      <div className="w-64 fixed top-0 left-0 h-screen bg-[#3a3a3a] z-40 shadow-lg">
        <Navbar />
      </div>

      {/* Detalles del Producto */}
      <div className="flex-1 ml-64 pt-16 px-8">
        <button
          onClick={toggleMenu}
          //className="absolute top-4 left-4 z-50 p-2 bg-[#ff00ff] text-white rounded-full shadow-lg hover:bg-[#e600e6] focus:outline-none"
        ></button>
        {/* Navbar desplegable */}
        {menuOpen && (
          <div className="absolute top-0 left-0 w-60 h-screen bg-[#3a3a3a] z-40 shadow-lg p-4">
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-xl text-white hover:text-[#ff00ff]"
            >
              ✖
            </button>
            <Navbar /> {/* Aquí se incluye tu componente Navbar */}
          </div>
        )}
        {/* Contenido del Producto */}
        <main className="container mx-auto">
          <section className="text-center mb-8">
            <h1 className="text-4xl font-bold neon">{product.name}</h1>
            {/* Imagen del producto con tamaño más grande */}
            <img
              src={`${server}${product.image}`} // Usamos el mismo patrón para las imágenes
              alt={product.name}
              className="w-full max-h-[600px] object-contain rounded-lg mt-4 neon-outline"
            />
            <p className="mt-4 text-xl neon">{product.description}</p>
            <p className="mt-4 text-2xl font-semibold">
              Precio: ${product.price}
            </p>
            {/* Mostramos 'year' como la cantidad */}
            <p className="mt-4 text-xl">Cantidad: {product.year}</p>
          </section>

          {/* Botón Agregar al carrito */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-[#ff00ff] text-[#1a0d16] px-6 py-2 rounded hover:bg-[#5a5a5a] transition-all duration-200 ease-in-out"
            >
              Agregar al carrito
            </button>
          </div>
        </main>
      </div>

      {/* Pie de página */}
      <footer className="bg-[#3a3a3a] p-4 text-center mt-auto">
        <p>© 2024 Solik - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default ProductDetailPage;
