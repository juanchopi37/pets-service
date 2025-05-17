// filepath: /home/qubit/study/pets-service/src/pages/home/index.tsx
import React, { useState, ChangeEvent } from "react";
import {
  FormControl,
  Typography,
  Button,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { FormPets } from "../../types/types";

export const Home = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const [form, setForm] = useState<FormPets>({
    petName: "",
    race: "",
    age: "",
    description: "",
    ownerId: currentUser?.id || "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

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
        <Stack padding={2}>
          <FormControl>
            <Stack fullWidth spacing={2}>
              <TextField
                label="Nombre"
                name="petName"
                value={form.petName}
                onChange={handleChange}
              />
            </Stack>
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
