// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwWdwxrnqzjH_RZCHxtsJ-mePRqhUFU5s",
    authDomain: "e-commerce-e7b92.firebaseapp.com",
    projectId: "e-commerce-e7b92",
    storageBucket: "e-commerce-e7b92.firebasestorage.app",
    messagingSenderId: "812915691669",
    appId: "1:812915691669:web:f049e128d0169584614b9c",
    measurementId: "G-K56DL1TJT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)

