// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVgTWP4PnjexwOcrrxcgXWMNyDXaNtnTs",
  authDomain: "todo-d508b.firebaseapp.com",
  projectId: "todo-d508b",
  storageBucket: "todo-d508b.appspot.com",
  messagingSenderId: "919777973523",
  appId: "1:919777973523:web:b01ff9f22f34d49e46f6e6",
  measurementId: "G-3QZSTEWCV8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
