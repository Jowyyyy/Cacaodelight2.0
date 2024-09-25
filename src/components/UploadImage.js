import React, { useState } from "react";
import { storage, db } from "./firebase"; // Asegúrate de que la ruta es correcta
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function UploadImage() {
const [file, setFile] = useState(null);
const [progress, setProgress] = useState(0);

const handleFileChange = (e) => {
    setFile(e.target.files[0]);
};

const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
    "state_changed",
    (snapshot) => {
        const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
    },
    (error) => {
        console.error("Error al subir la imagen:", error);
    },
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("URL de descarga:", downloadURL);

        addDoc(collection(db, "productos"), {
        imageUrl: downloadURL,
        name: file.name,
        });
        });
    }
    );
};

return (
    <div>
    <h2>Subir Imagen</h2>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUpload}>Subir Imagen</button>
    {progress > 0 && <p>Progreso: {progress}%</p>}
    </div>
);
}

export default UploadImage;
