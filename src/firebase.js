// src/firebase.js

// fungsi Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMnTGNUnXdgbNV8fhiV-EApO-7lkCFtfY",
  authDomain: "bloomboutique-project.firebaseapp.com",
  projectId: "bloomboutique-project",
  storageBucket: "bloomboutique-project.firebasestorage.app",
  messagingSenderId: "456316898074",
  appId: "1:456316898074:web:b61c7d80db643cf0da3aa3",
  measurementId: "G-MXDBP5NY8X"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor 'jasa' Firebase agar bisa dipakai di file lain
export const auth = getAuth(app);       // Jasa untuk otentikasi (login, register)
export const db = getFirestore(app);    // Jasa untuk database (Firestore)
