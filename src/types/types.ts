export interface User {
  email: string;
  password?: string; // Hacer password opcional
  name: string;
  id: string;
  role: "admin" | "user";
}

export interface FormPets {
  petName: string;
  race: string;
  age: string;
  description?: string;
  ownerId: string;
}
