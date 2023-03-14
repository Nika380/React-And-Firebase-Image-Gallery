import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "react-firebase-galery-74881.firebaseapp.com",
  projectId: "react-firebase-galery-74881",
  storageBucket: "react-firebase-galery-74881.appspot.com",
  messagingSenderId: "550958133075",
  appId: "1:550958133075:web:358345e59126279202bba6"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
export const auth = getAuth();
