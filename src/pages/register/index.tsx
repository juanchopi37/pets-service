import { Stack, Typography, TextField, Button } from "@mui/material";
import { useState, FormEvent } from "react";

export const Register = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Acá va la lógica para procesar el formulario
    console.log("Datos del formulario:", form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Stack padding={2} component="form" onSubmit={handleSubmit} spacing={2}>
      <Typography variant="h4">Registro</Typography>

      <TextField
        label="Nombre"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <TextField
        label="Apellido"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />

      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />

      <TextField
        label="Teléfono"
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={handleChange}
      />

      <Button type="submit" variant="contained">
        Registrarse
      </Button>
    </Stack>
  );
};
