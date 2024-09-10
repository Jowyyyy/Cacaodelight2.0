import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { auth, db } from "./firebase"; // Asegúrate de que la ruta sea correcta
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Inicializa useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Crear usuario con Firebase Authentication
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Actualizar perfil del usuario (nombre de visualización)
      await updateProfile(result.user, { displayName });

      // Subir datos adicionales a Firestore
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        displayName,
        email,
        avatarURL: avatar ? URL.createObjectURL(avatar) : null, // Puedes almacenar la URL del avatar o subirla a Firebase Storage
      });

      // Redirigir al inicio de sesión después de un registro exitoso
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Your Logo Name</span>
        <span className="title">Register</span>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoFocus
            required
          />
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
          <label htmlFor="file">
            <img src="https://cdn-icons-png.flaticon.com/128/6632/6632582.png" alt="Avatar" />
            <span>Add Avatar</span>
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            accept=".jpg, .png"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          <button type="submit">Sign up</button>
          {error && <p>{error}</p>}
        </form>
        <p>
          You do have an account? 
          <span 
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate('/login')} // Redirige al login
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
