// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'what-lunch.firebaseapp.com',
  projectId: 'what-lunch',
  storageBucket: 'what-lunch.appspot.com',
  messagingSenderId: '636450027836',
  appId: '1:636450027836:web:570db13fbe1385ff3d0639',
  measurementId: 'G-DJS0BZZGT9',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
