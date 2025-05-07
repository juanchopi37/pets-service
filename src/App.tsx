import { Routes, Route, Navigate } from "react-router-dom";
import { Loyout } from "./components/Loyaut"; // Mantendré el nombre como está en tu código actual
import { Register } from "./pages/register";

const App = () => {
  return (
    <Loyout>
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* Ruta por defecto que redirecciona a register */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </Loyout>
  );
};

export default App;
