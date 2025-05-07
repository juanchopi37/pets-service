// filepath: /home/qubit/study/pets-service/src/pages/home/index.tsx
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

export const Home = () => {
    const navigate = useNavigate();
    const currentUser = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate("/login");
    };

    return (
        <Box textAlign="center" p={3}>
            <Typography variant="h4" gutterBottom>
                Bienvenido a Home, {currentUser?.name || "Usuario"}
            </Typography>
            <Typography variant="body1">
                Este es tu panel de usuario.
            </Typography>
            {/* Aquí se mostrarían los datos del usuario y funcionalidades específicas del usuario */}
            <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 3 }}>
                Cerrar Sesión
            </Button>
        </Box>
    );
};