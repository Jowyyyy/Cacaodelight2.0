import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import styles from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/homePage');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.loginContainer}> 
    <header className={styles.header}>
        <img src="src/img/logo.webp" className= "img" alt="Logolog" />
        <h1>Cacao Delight</h1>
      </header>
      <div className={styles.formWrapper}>
        <span className={styles.logo}>Bienvenido!!</span>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='botonlog'type="submit">Inicia sesión</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p>
          No tienes cuenta? 
          <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate('/signup')}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
