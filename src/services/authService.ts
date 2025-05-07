import { User } from "../types/types";
import { ADMIN_CONFIG } from "../adminConfig/adminConfig";

// Interfaz para el usuario actualmente logueado (sin contraseña)
interface CurrentUser extends Omit<User, 'password'> {
  isLoggedIn: boolean;
}

export const authService = {
  login(email: string, password: string): { success: boolean; user?: CurrentUser; message?: string } {
    try {
      // Verificar si es administrador
      if (email === ADMIN_CONFIG.email && password === ADMIN_CONFIG.password) {
        const adminUser: CurrentUser = {
          email: ADMIN_CONFIG.email,
          name: ADMIN_CONFIG.name,
          id: ADMIN_CONFIG.id,
          role: ADMIN_CONFIG.role,
          isLoggedIn: true,
        };
        localStorage.setItem("currentUser", JSON.stringify(adminUser));
        return { success: true, user: adminUser };
      }

      // Verificar si es usuario normal  
      // esto asume un solo usur base registrado en localS torage con la key "user" 
      const storedUserJSON = localStorage.getItem("user");
      if (storedUserJSON) {
        const storedUser: User = JSON.parse(storedUserJSON);
        if (storedUser.email === email && storedUser.password === password) {
          const currentUser: CurrentUser = {
            email: storedUser.email,
            name: storedUser.name,
            id: storedUser.id,
            role: storedUser.role,
            isLoggedIn: true,
          };
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          return { success: true, user: currentUser };
        }
      }

      return { success: false, message: "Email o contraseña incorrectos" };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, message: "Error al iniciar sesión" };
    }
  },

  // userData para registrar solo necesita los campos para crear un User base.
  // El User base (guardado con key "user") sí incluye la contraseña para verificación en login.
  register(userData: Pick<User, "name" | "email" | "password">): { success: boolean; user?: User; message?: string } {
    try {
      if (!userData.password) {
        return { success: false, message: "La contraseña es requerida para el registro." };
      }
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: "user" as const,
      };
      // sobrescribiria al usuario anteriormente registrado ⬆️
      // Para múltiples usuarios se necesitaría almacenar un array de usuarios, pero 
      // eso no es parte de la lógica actual.
      // localStorage.setItem("users", JSON.stringify([newUser]));
      // Guardar el nuevo usuario en localStorage
      // Esto sobrescribirá el usuario anterior, si existe.
      // Si se desea permitir múltiples usuarios, se debería almacenar un array de usuarios.
      // const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      // existingUsers.push(newUser);
      // localStorage.setItem("users", JSON.stringify(existingUsers));    
      localStorage.setItem("user", JSON.stringify(newUser));
      return { success: true, user: newUser, message: "Registro exitoso." };
    } catch (error) {
      console.error("Error en registro:", error);
      return { success: false, message: "Error al registrar usuario" };
    }
  },

  logout() {
    localStorage.removeItem("currentUser");
  },

  // Obtener el user actial en el local storaege
  getCurrentUser(): CurrentUser | null {
    try {
      const userString = localStorage.getItem("currentUser");
      if (userString) {
        const user: CurrentUser = JSON.parse(userString);
        // Asegurar si isLoggedIn es true y tiene un rol válido
        if (user.isLoggedIn && (user.role === "admin" || user.role === "user")) {
          return user;
        } else {
          return null;
        }
      }
      return null;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.isLoggedIn;
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.isLoggedIn && user.role === "admin";
  },

  isUser(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.isLoggedIn && user.role === "user";
  }
};