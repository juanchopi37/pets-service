import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { Register, Login, Home, Dashboard } from "./pages/barrel"; // Importar Home y Dashboard
import { Loyout } from "./components/barrel";
import { authService } from "./services/authService";
import { useEffect } from "react";

// Componente para proteger rutas según el rol
const ProtectedRoute = ({ requiredRole }: { requiredRole: "admin" | "user" }) => {
  const currentUser = authService.getCurrentUser();
  const location = useLocation(); // Para redirigir de vuelta después del login

  if (!currentUser || !currentUser.isLoggedIn) {
    // Si no está logueado, redirigir a login, guardando la ruta original
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (currentUser.role !== requiredRole) {
    // Si está logueado pero no tiene el rol correcto, redirigir a su página por defecto
    // o a una página de "acceso denegado" o de vuelta a login.
    // Por ahora, redirigimos a su "home" respectivo.
    return <Navigate to={currentUser.role === "admin" ? "/dashboard" : "/home"} replace />;
  }

  return <Outlet />; // Si está logueado y tiene el rol correcto, renderizar la ruta hija
};

// Componente para rutas públicas (login, register)
// Si el usuario ya está logueado, redirige a su panel correspondiente
const PublicRoute = () => {
  const currentUser = authService.getCurrentUser();
  if (currentUser && currentUser.isLoggedIn) {
    return <Navigate to={currentUser.role === "admin" ? "/dashboard" : "/home"} replace />;
  }
  return <Outlet />; // Si no está logueado, renderizar la ruta hija (Login o Register)
};

const App = () => {
  // Este useEffect es un pequeño truco para forzar la reevaluación de las rutas
  // si el estado de autenticación cambia (ej. por logout o login en otra pestaña).
  // Una solución más completa usaría un Context API para el estado de autenticación.
  const location = useLocation();
  useEffect(() => {
    // Simplemente para que el componente se actualice en cambios de ruta,
    // lo que ayuda a que las redirecciones basadas en authService se re-evalúen.
  }, [location.pathname]);

  return (
    <Loyout>
      <Routes>
        {/* Rutas públicas que redirigen si ya está autenticado */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rutas protegidas para usuarios con rol "user" */}
        <Route element={<ProtectedRoute requiredRole="user" />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* Rutas protegidas para usuarios con rol "admin" */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Redirección inicial desde la raíz "/" */}
        <Route
          path="/"
          element={
            authService.isAuthenticated() ? (
              authService.isAdmin() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Ruta comodín para cualquier otra URL no definida */}
        {/* Podrías tener un componente <NotFound /> aquí */}
        <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>
    </Loyout>
  );
};
export default App;
