import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  IoPersonAdd,
  IoLogIn,
  IoAddCircle,
  IoLogOut,
  IoPerson,
  IoCart,
  IoHome, // Icono para la página principal
  IoList, // Icono para la lista de productos
} from "react-icons/io5";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-64 h-full bg-[#3a3a3a] text-white z-50 p-4">
      <h2 className="text-center font-bold text-yellow-500 neon">Menú</h2>
      <ul className="flex flex-col gap-4">
        {/* Ruta hacia la página principal */}
        <li>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold bg-zinc-300 rounded-md px-2 py-1 hover:bg-yellow-500"
          >
            <IoHome size={16} /> Página Principal
          </Link>
        </li>

        {/* Siempre mostrar productos */}
        <li>
          <Link
            to={isAuthenticated ? "/products" : "/"}
            className="flex items-center gap-2 text-sm font-semibold bg-zinc-300 rounded-md px-2 py-1 hover:bg-yellow-500"
          >
            <IoList size={16} /> Productos
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            {/* Mostrar nombre de usuario en el perfil */}
            <li className="flex items-center gap-2">
              <IoPerson size={16} />
              <span className="text-sm items-center font-semibold">
                {user.username}
              </span>
            </li>
            {/* Mostrar opciones solo si está autenticado */}
            <li>
              <Link
                to="/add-product"
                className="flex items-center gap-2 text-sm font-semibold bg-zinc-900 rounded-md px-2 py-1 hover:bg-yellow-500"
              >
                <IoAddCircle size={16} /> Agregar Producto
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-semibold bg-zinc-900 rounded-md px-2 py-1 hover:bg-yellow-500"
              >
                <IoPerson size={16} /> {user.username}
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="flex items-center gap-2 text-sm font-semibold bg-zinc-900 rounded-md px-2 py-1 hover:bg-yellow-500"
              >
                <IoCart size={16} /> Carrito
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => logout()}
                className="flex items-center gap-2 text-sm font-semibold bg-red-600 rounded-md px-2 py-1 hover:bg-red-500"
              >
                <IoLogOut size={16} /> Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            {/* Mostrar opciones solo si no está autenticado */}
            <li>
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-semibold bg-zinc-600 rounded-md px-2 py-1 hover:bg-yellow-500"
              >
                <IoLogIn size={16} /> Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center gap-2 text-sm font-semibold bg-zinc-600 rounded-md px-2 py-1 hover:bg-yellow-500"
              >
                <IoPersonAdd size={16} /> Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
