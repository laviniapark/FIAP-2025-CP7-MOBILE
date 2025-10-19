// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2P7JP1fpe5vA9bqrzX_OLUn1O2G1oEiU",
  authDomain: "fiap-587f7.firebaseapp.com",
  projectId: "fiap-587f7",
  storageBucket: "fiap-587f7.firebasestorage.app",
  messagingSenderId: "1854532678",
  appId: "1:1854532678:web:dafe980f249bd01ff8ee47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
