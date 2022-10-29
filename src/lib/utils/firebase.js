import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRl41bwgvThI5BsO2-spUZKnEDvA8gWqE",
  authDomain: "salvaguarda-teste.firebaseapp.com",
  projectId: "salvaguarda-teste",
  storageBucket: "salvaguarda-teste.appspot.com",
  messagingSenderId: "928218197048",
  appId: "1:928218197048:web:47696b223bab66b53d0acd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
