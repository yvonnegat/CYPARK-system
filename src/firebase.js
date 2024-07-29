// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCdAJO3EdnXS6OdXRPKUBAuDbxKgbn46mc",
  authDomain: "cypark-smartparking.firebaseapp.com",
  projectId: "cypark-smartparking",
  storageBucket: "cypark-smartparking.appspot.com",
  messagingSenderId: "840524777449",
  appId: "1:840524777449:web:30386a3be1c67cab29ed78",
  measurementId: "G-TTRCTQDQPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, analytics, db }; // Export Firestore
