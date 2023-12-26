// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import {app} from './firebase.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDkDC8PrLPyHSCaYJVQKj7FaWn_XmVJW8Y",
    authDomain: "aliens-db.firebaseapp.com",
    projectId: "aliens-db",
    storageBucket: "aliens-db.appspot.com",
    messagingSenderId: "69185709826",
    appId: "1:69185709826:web:073bf55a0667d5f39fc41b",
    measurementId: "G-HVMFE236WM"
  };

// Initialize Firebase

app
// const analytics = getAnalytics(app);
export const dbAliens = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()