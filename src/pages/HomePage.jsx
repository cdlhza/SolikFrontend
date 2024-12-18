import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // Importa el Navbar
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext"; // Importa el contexto de productos

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getProducts, products } = useProducts(); // Accede a los productos desde el contexto
  const toggleMenu = () => setMenuOpen(!menuOpen); // Alterna el estado del menú

  const server = import.meta.env.VITE_BASE_URL + "/img/"; // Asegúrate de tener la URL base correcta

  useEffect(() => {
    const fetchProducts = async () => {
      await getProducts(); // Obtén los productos al cargar la página
    };

    fetchProducts();
  }, [getProducts]);

  return (
    <div className="bg-[#210303] text-white min-h-screen">
      {/* Botón de menú */}
      <button
        onClick={toggleMenu}
        //className=" absolute top-4 left-4 z-50 p-2 bg-[#ff00ff] text-white rounded-full shadow-lg hover:bg-[#e600e6] focus:outline-none"
      >
        ☰
      </button>

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

      {/* Encabezado */}
      <header className="p-4 flex items-center justify-center">
        <a href="#" className="text-3xl font-bold neon">
          Solik
        </a>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 pt-20">
        {/* Sección de imagen horizontal */}
        <section className="mt-8">
          <img
            src="/imagenes/Solik2.png"
            className="w-full h-96 object-cover neon-outline"
          />
        </section>

        {/* Productos destacados */}
        <section className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="p-4 bg-[#3a3a3a] rounded-lg shadow-lg text-center neon-outline">
                {/* Aquí usamos la URL base para las imágenes */}
                <img
                  src={`${server}${product.image}`} // Utiliza el mismo patrón que en ProductCard
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-2xl mb-4 neon">{product.name}</h2>
                <p>{product.description}</p>
                <button className="mt-4 bg-[#ff00ff] text-[#1a0d16] px-4 py-2 rounded hover:bg-[#5a5a5a]">
                  Comprar
                </button>
              </div>
            </Link>
          ))}
        </section>

        {/* Galería de imágenes */}
        <section className="my-8">
          <h2 className="text-3xl mb-4 neon">Galería</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="/imagenes/image(1).jpg"
              alt="Imagen 1"
              className="w-full h-64 object-cover rounded-lg neon-outline"
            />
            <img
              src="/imagenes/image(10).jpg"
              alt="Imagen 2"
              className="w-full h-64 object-cover rounded-lg neon-outline"
            />
            <img
              src="/imagenes/image(12).jpg"
              alt="Imagen 3"
              className="w-full h-64 object-cover rounded-lg neon-outline"
            />
            <img
              src="/imagenes/image(2).jpg"
              alt="Imagen 4"
              className="w-full h-64 object-cover rounded-lg neon-outline"
            />
          </div>
        </section>
      </main>

      {/* Pie de página */}
      <footer className="bg-[#3a3a3a] p-4 text-center">
        <p>© 2024 Solik - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default HomePage;
