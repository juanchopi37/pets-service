# Proyecto - Aplicación de Citas Veterinarias

## Descripción

Este proyecto consiste en una aplicación para gestionar citas veterinarias, permitiendo a los usuarios registrar mascotas y programar consultas médicas.

## Características

- Gestión de perfiles de mascotas
- Programación de citas veterinarias
- Recordatorios y notificaciones
- Historial médico de mascotas
- Panel administrativo para veterinarios

## Tecnologías utilizadas

- Backend: Node.js, Express
- Base de datos: MongoDB
- Frontend: React.js
- Autenticación: JWT

## Instalación y despliegue

### Requisitos previos

- Node.js (v14 o superior)
- npm o yarn

### Despiegue en local

```bash
# Clonar el repositorio
git clone https://github.com/juanchopi37/pets-service.git --depth=1

# Entrar al directorio
cd pets-service

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita el archivo .env con tus configuraciones

# Iniciar la aplicación
npm run dev
```

## Uso

La aplicación estará disponible en `http://localhost:3000`

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
