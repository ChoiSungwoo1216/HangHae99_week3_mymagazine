// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrPVob1VcqVvSTfZqAn2zjafVZ0PbaaN4",
    authDomain: "my-magazine-1e5ec.firebaseapp.com",
    projectId: "my-magazine-1e5ec",
    storageBucket: "my-magazine-1e5ec.appspot.com",
    messagingSenderId: "1001704458283",
    appId: "1:1001704458283:web:64c3d2590394bef3db426e",
    measurementId: "G-SF8CV23K0Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;