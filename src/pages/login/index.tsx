import React, { useState } from 'react';
 export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // simula inicio de sesión
        console.log('Iniciar sesión con:', email, password);
      };

    const handleRegister = () => {
        // redireccion para registrarse
        console.log('redirigiendo hacia registro...');
    };
    return (
      <div style={{ maxWidth: '400px', margin: 'auto' }}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>Correo:</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <label>Contraseña:</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <button onClick={handleLogin}>Iniciar sesión</button>
          <button onClick={handleRegister} style={{ marginLeft: '10px' }}>Registrarse</button>
        </form>
    </div>
    );
  };
  
  export default Login;
