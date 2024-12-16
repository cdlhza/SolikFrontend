import React, { useState } from "react";
import {
  IoPersonAdd,
  IoLogIn,
  IoLogOut,
  IoPerson,
  IoCart,
} from "react-icons/io5";
import { useAuth } from "../context/AuthContext"; // Asegúrate de que tengas el contexto de autenticación
import { Link } from "react-router-dom";

function ProfilePage() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Estado para manejar la apertura/cierre del sidebar

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-0"
        } lg:w-64 fixed top-0 left-0 h-full bg-zinc-700 text-white transition-width duration-300 z-20`} // Sidebar
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col p-4">
            <Link
              to={isAuthenticated ? "/products" : "/"}
              className="text-2xl font-bold text-yellow-500"
            >
              Productos
            </Link>
            <ul className="flex flex-col gap-4 mt-8">
              {isAuthenticated ? (
                <>
                  <li className="flex items-center gap-3">
                    <IoPerson size={30} />
                    <span>{user?.username || "Usuario"}</span>
                  </li>
                  <li>
                    <Link
                      to="/add-product"
                      className=" rounded-sm p-2 hover:text-yellow-500"
                    >
                      <IoPersonAdd size={30} /> Agregar Producto
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className=" rounded-sm p-2 hover:text-yellow-500"
                    >
                      <IoPerson size={30} /> Perfil
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className=" rounded-sm p-2 hover:text-yellow-500"
                    >
                      <IoCart size={30} /> Carrito
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={logout}
                      className=" rounded-sm p-2 hover:text-yellow-500"
                    >
                      <IoLogOut size={30} /> Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="bg-zinc-500 rounded-sm p-2 hover:text-yellow-500"
                    >
                      <IoLogIn size={30} /> Iniciar Sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="bg-zinc-500 rounded-sm p-2 hover:text-yellow-500"
                    >
                      <IoPersonAdd size={30} /> Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Botón para abrir/cerrar el sidebar en pantallas pequeñas */}
      <button
        onClick={toggleMenu}
        className="lg:hidden text-3xl text-yellow-500 absolute top-4 left-4 z-10"
      >
        &#9776;
      </button>

      {/* Contenido de la página */}
      <div className="ml-64 p-4 w-full">
        {" "}
        {/* Dejamos espacio para el sidebar */}
        <h1 className="text-3xl font-bold">Perfil de Usuario</h1>
        <p>
          {user ? `Bienvenido, ${user.username}` : "No has iniciado sesión."}
        </p>
        {/* Agrega más detalles del perfil aquí */}
      </div>
    </div>
  );
}

export default ProfilePage;
