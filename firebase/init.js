// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "{REDACTED}",
  authDomain:"{REDACTED}",
  projectId: "{REDACTED}",
  storageBucket: "{REDACTED}",
  messagingSenderId: "{REDACTED}",
  appId: "{REDACTED}",
  measurementId: "{REDACTED}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)
export { db, storage};
// const fooddb = db.collection('foods').get();
// db.collection("foods").where("contacts.1", "==", "").get()
