import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; // Ajusta la ruta según tu estructura

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Iniciar sesión con Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      
      // Redirigir a la página de inicio (HomePage) después del login exitoso
      navigate('/homePage'); // Ajusta la ruta a donde quieras redirigir
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className='logo'>Your Logo Name</span>
        <span className='title'>Login</span>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            autoFocus 
            required 
          />
          <input 
            type="password" 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Log in</button>
          {error && <p>{error}</p>}
        </form>
        <p>
          You don't have an account? 
          <span 
            style={{ cursor: "pointer", color: "blue" }} 
            onClick={() => navigate('/signup')} // Redirige al formulario de registro
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
