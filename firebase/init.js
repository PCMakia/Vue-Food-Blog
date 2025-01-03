// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALw62wrNJ3VNfEmlIhpKKyNK75SLk-QYc",
  authDomain: "project2-19285.firebaseapp.com",
  projectId: "project2-19285",
  storageBucket: "project2-19285.firebasestorage.app",
  messagingSenderId: "452461111347",
  appId: "1:452461111347:web:3c09ec6a8289325d5a5b46",
  measurementId: "G-194WN1BNZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)
export { db, storage};
// const fooddb = db.collection('foods').get();
// db.collection("foods").where("contacts.1", "==", "").get()