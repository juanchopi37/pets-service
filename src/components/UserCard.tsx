import { TextField, Card, Stack, Typography } from "@mui/material";
import { authService } from "../services/authService";
export const UserCard = () => {
  const currentUser = authService.getCurrentUser();

  return (
    <Stack>
      <Card>
        <Typography>Registra tu mascota aquí</Typography>
        <TextField
          content="mascota"
          placeholder="Nombre de tu mascota"
          required
        ></TextField>
      </Card>
    </Stack>
  );
};
