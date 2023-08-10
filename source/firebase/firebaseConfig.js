// Import the functions you need from the SDKs you need
import firebase,{initializeApp, getApps, getApp} from 'firebase/app';
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
} from 'firebase/firestore';

import { getStorage, connectStorageEmulator } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDitqX-2cptNGEbs3XMqwey4t8suRpK1Lw',
  authDomain: 'tgb-app-e24e1.firebaseapp.com',
  projectId: 'tgb-app-e24e1',
  storageBucket: 'tgb-app-e24e1.appspot.com',
  messagingSenderId: '119516132084',
  appId: '1:119516132084:web:52ae59a849045f8b29a4a1',
  measurementId: 'G-KVKZL91SPZ',
};
// Initialize Firebase
let app;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const auth = getAuth(app);

const db = getFirestore(app);

export {db, auth};
