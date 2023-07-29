import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWTAmTpKH4eHIDxPnvz4e92lWkQ8Rjkfc",
  authDomain: "clase13-37893.firebaseapp.com",
  projectId: "clase13-37893",
  storageBucket: "clase13-37893.appspot.com",
  messagingSenderId: "177099735423",
  appId: "1:177099735423:web:d4c91f2f45168ff15bda4a"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);