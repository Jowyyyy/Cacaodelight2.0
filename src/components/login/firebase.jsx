import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAdUYaeCcBKwfpLp3C33gT-CEClDw2Egd0",
  authDomain: "cacaodelight-c3f27.firebaseapp.com",
  projectId: "cacaodelight-c3f27",
  storageBucket: "cacaodelight-c3f27.appspot.com",
  messagingSenderId: "529560623470",
  appId: "1:529560623470:web:87a0c1602637fa8060097f"
};

// Inicializa Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };