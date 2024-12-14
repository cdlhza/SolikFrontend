import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth(); // Extraemos los valores del contexto de autenticación
  console.log("Loading:" + loading);
  console.log("isAuthenticated:" + isAuthenticated);

  // Si la aplicación está cargando los datos, mostramos un mensaje de carga
  if (loading) {
    return <h1>cargando...</h1>;
  }
if(!loading && !isAuthenticated)
  return <Navigate to='/login' replace/>
  // Aquí iría el resto de la lógica para manejar rutas protegidas
  return( <Outlet />)
}

export default ProtectedRoute
