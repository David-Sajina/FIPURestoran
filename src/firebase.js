import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg-uDj1CICi0MEb5qSI8AkT_Bc0Leq-fA",
  authDomain: "fipurestoran.firebaseapp.com",
  projectId: "fipurestoran",
  storageBucket: "fipurestoran.appspot.com",
  messagingSenderId: "319165082482",
  appId: "1:319165082482:web:4b383bf7a131cb296ccbeb",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
