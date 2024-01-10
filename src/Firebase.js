// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./Script";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
