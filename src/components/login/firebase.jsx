import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdUYaeCcBKwfpLp3C33gT-CEClDw2Egd0",
  authDomain: "cacaodelight-c3f27.firebaseapp.com",
  projectId: "cacaodelight-c3f27",
  storageBucket: "cacaodelight-c3f27.appspot.com",
  messagingSenderId: "529560623470",
  appId: "1:529560623470:web:87a0c1602637fa8060097f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const storage = getStorage(app);
export { auth, db };