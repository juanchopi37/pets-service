// filepath: /home/qubit/study/pets-service/src/pages/home/index.tsx
import {
  FormControl,
  Typography,
  InputLabel,
  Button,
  Box,
  Stack,
  Text,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

export const Home = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <Box textAlign="center" p={3}>
      <Stack>
        <Typography variant="h4" gutterBottom>
          Bienvenido a Home, {currentUser?.name || "Usuario"}
        </Typography>
      </Stack>
      <DashboardLayout>
        <Stack padding={2} spacing={2}>
          <FormControl>
            <Stack fullWidth spacing={2}></Stack>
          </FormControl>
        </Stack>
      </DashboardLayout>
      {/* Aquí se mostrarían los datos del usuario y funcionalidades específicas del usuario */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ mt: 3 }}
      >
        Cerrar Sesión
      </Button>
    </Box>
  );
};
