// filepath: /home/qubit/study/pets-service/src/pages/dashboard/index.tsx
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

export const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };
  
  // const registeredUserJSON = localStorage.getItem("user");
  // const registeredUser = registeredUserJSON ? JSON.parse(registeredUserJSON) : null;

  return (
    <Box textAlign="center" p={3}>
      <Typography variant="h4" gutterBottom>
        Bienvenido al Dashboard, {currentUser?.name || "Admin"}
      </Typography>
      <Typography variant="body1">
        Este es el panel de administración.
      </Typography>
      {/* 
      {registeredUser && (
        <Box mt={2} border={1} p={2} borderColor="grey.300" borderRadius={1}>
          <Typography variant="h6">Último usuario registrado en el sistema:</Typography>
          <Typography>Nombre: {registeredUser.name}</Typography>
          <Typography>Email: {registeredUser.email}</Typography>
        </Box>
      )} 
      */}
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 3 }}>
        Cerrar Sesión
      </Button>
    </Box>
  );
};