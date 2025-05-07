import { Stack, Typography, TextField, Button, Box } from "@mui/material";
import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { Login } from "../login"; // No se usa y causaría dependencia circular si Login importa Register
import { authService } from "../../services/authService"; // Importar authService

export const Register = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "", // Aunque no se guarde en User, el formulario lo pide
    password: "",
    email: "",
    phoneNumber: "", // Aunque no se guarde en User, el formulario lo pide
  });

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.lastName || !form.email || !form.password) {
      alert("Por favor, completa nombre, apellido, email y contraseña.");
      return;
    }

    // authService.register espera name, email, password.
    // lastName y phoneNumber son parte del formulario pero no del User base en este diseño.
    const registrationData = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    const result = authService.register(registrationData);

    if (result.success) {
      alert(result.message || "Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login");
    } else {
      alert(result.message || "Error en el registro.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Stack padding={2} component="form" onSubmit={handleSubmit} spacing={2} maxWidth={400} width="100%">
      <Typography variant="h4" align="center">Registro</Typography>

      <TextField
        label="Nombre"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Apellido"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Teléfono"
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={handleChange}
        fullWidth
      />

      <Button type="submit" variant="contained" fullWidth>
        Registrarse
      </Button>

      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </Typography>
      </Box>
    </Stack>
  );
};
