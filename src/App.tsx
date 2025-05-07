import { Routes, Route, Navigate } from "react-router-dom";
import { Loyout } from "./components/Loyaut"; // Mantendré el nombre como está en tu código actual
import { Register } from "./pages/register";

const App = () => {
import { useState } from "react";
import { Stack } from "@mui/material";
import "./App.css";
import {Route, Routes, Navigate} from "react-router-dom";
import { Loyaut } from "./components/Loyaut";
import Login from "./pages/login";
function App() {
 const [] 
  
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

  <Loyaut> 
  {/**/}
   <Routes> 
  {/**/}
  {/**/}
     </Routes> 
  {/**/}
      <Login>
         {/**/}
          {/**/} 
      </Login>
        {/**/}
   </Loyaut> 

  )
}
export default App;
