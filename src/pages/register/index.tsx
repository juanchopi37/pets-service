import { Stack, Typography, TextField } from "@mui/material";
import { useState } from "react";

export const Register = () => {
  const [form, setForm] = useState({
    name: string,
    lastName: string,
    password: string,
    email: string,
    phoneNumber: number,
  });

  return <Stack padding={2}></Stack>;
};
