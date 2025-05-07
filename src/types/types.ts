export interface User {
  email: string;
  password?: string; // Hacer password opcional
  name: string;
  id: string;
  role: "admin" | "user";
}