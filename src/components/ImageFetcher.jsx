import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./login/firebase";

const ImageFetcher = () => {
const [imageUrls, setImageUrls] = useState([]);

  const imageNames = ['img-01.jpg', 'img-02.jpg', 'img-03.jpg', 'img-04.jpg'];

async function getImageUrl(imageName) {
    try {
    const imageRef = ref(storage, `images/${imageName}`);
    const url = await getDownloadURL(imageRef);
    console.log("URL de la imagen:", url);
    return url;
    } catch (error) {
    console.error("Error al obtener la URL de la imagen:", error);
    return null;
    }
}
useEffect(() => {
    const fetchImages = async () => {
    const urls = await Promise.all(imageNames.map((imageName) => getImageUrl(imageName)));
    setImageUrls(urls.filter((url) => url !== null));
    };

    fetchImages();
}, []);

return (
    <div>
    <h2>Imágenes del Firebase Storage</h2>
    <div className="image-list">
        {imageUrls.map((url, index) => (
        <img key={index} src={url} alt={`Imagen ${index + 1}`} style={{ width: "200px", margin: "10px" }} />
        ))}
    </div>
    </div>
);
};

export default ImageFetcher;
