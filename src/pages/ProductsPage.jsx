import { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar"; // Asegúrate de que esté importado correctamente
import { IoMenu } from "react-icons/io5"; // Icono del botón del menú

function ProductsPage() {
  const { getProducts, products } = useProducts();

  // Ejecutamos la función getProducts inmediatamente después de que se cargue el componente
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (products.length === 0) return <h1>No hay productos para listar</h1>;

  return (
    <div className="flex">
      {/* Sidebar estática */}
      <div className="w-64 bg-zinc-700 text-white h-screen fixed left-0 top-0">
        <div className="flex flex-col p-4">
          <Navbar /> {/* Navbar ubicada en el sidebar */}
        </div>
      </div>

      {/* Contenido de la página */}
      <div className="ml-64 p-4 w-full">
        {/* Botón para desplegar el menú solo en pantallas pequeñas */}
        <button className="lg:hidden text-3xl text-yellow-500 mb-4">
          <IoMenu /> {/* Icono del menú */}
        </button>

        {/* Contenido de productos */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
