import { Stack, Typography, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService"; // Importar authService

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const result = authService.login(formData.email, formData.password);

    if (result.success && result.user) {
      alert(`Bienvenido ${result.user.role === "admin" ? "Administrador" : result.user.name}`);
      navigate(result.user.role === "admin" ? "/dashboard" : "/home");
    } else {
      alert(result.message || "Error al iniciar sesión");
    }
  };

  return (
    <Stack padding={2} component="form" onSubmit={handleSubmit} spacing={2} maxWidth={400} width="100%">
      <Typography variant="h4" align="center">Iniciar Sesión</Typography>

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        required
      />

      <Button type="submit" variant="contained" fullWidth>
        Iniciar Sesión
      </Button>

      <Box textAlign="center" mt={2}> {/* Corregido y unificado el Box para el enlace */}
        <Typography variant="body2">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </Typography>
      </Box>
    </Stack>
  );
};
