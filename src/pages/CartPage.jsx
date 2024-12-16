import React from "react";
import Navbar from "../components/Navbar"; // Asegúrate de que la ruta sea correcta
import { Link } from "react-router-dom"; // Necesario para el enlace hacia la página principal

function CartPage() {
  return (
    <div className="flex">
      {/* Navbar fija a la izquierda */}
      <Navbar />

      {/* Contenido de la página */}
      <div className="ml-64 p-4 w-full">
        {/* Enlace hacia la página principal */}
        <Link
          to="/"
          className="text-yellow-500 font-bold hover:text-yellow-300 px-4 py-2 mt-4 inline-block"
        >
          Volver a la página principal
        </Link>

        <h1 className="text-2xl font-bold mt-8">Carrito de Compras</h1>

        {/* Aquí va el contenido del carrito */}
        <div>
          <p>Tu carrito está vacío.</p>{" "}
          {/* Aquí puedes reemplazarlo con la lógica real del carrito */}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
