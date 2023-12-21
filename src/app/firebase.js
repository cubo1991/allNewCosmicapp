// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVu5URiapEhO3A_hJ4yoOBBH0ID5-OWmM",
  authDomain: "cosmic-selector.firebaseapp.com",
  projectId: "cosmic-selector",
  storageBucket: "cosmic-selector.appspot.com",
  messagingSenderId: "1029573193168",
  appId: "1:1029573193168:web:de03e375d257811692ddd5",
  measurementId: "G-E1GGLHP2CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()