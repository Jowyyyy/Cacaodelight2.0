import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import styles from './register.module.css'; 
const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsUploading(true);

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      let avatarURL = null;

      if (avatar) {
        const storageRef = ref(storage, `avatars/${result.user.uid}`);
        const uploadTask = await uploadBytesResumable(storageRef, avatar);
        avatarURL = await getDownloadURL(uploadTask.ref);
      }

      await updateProfile(result.user, { displayName, photoURL: avatarURL });
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        displayName,
        email,
        avatarURL,
      });

      setIsUploading(false);
      navigate("/login");
    } catch (error) {
      setError(error.message);
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.registerContainer}> 
    <header className={styles.header}>
        <img src="src/img/logo.webp" alt="Logoreg" />
        <h1>Cacao Delight</h1>
      </header>
      <div className={styles.formWrapper}>
        <span className={styles.logo}>Únete a nosotros!!</span>
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
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            accept=".jpg, .png"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          <button className="botonreg" type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Registrar"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p>
          ¿Ya tienes cuenta?{" "}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
