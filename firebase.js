// app-react/firebase.js
/*import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebase-config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };*/
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC5Ez1U6defN1NSl-kOPDME3TeeRfSXR6Q",
  authDomain: "project3dm.firebaseapp.com",
  projectId: "project3dm",
  storageBucket: "project3dm.firebasestorage.app",
  messagingSenderId: "999033769597",
  appId: "1:999033769597:web:74947edd367c28f7f0eb14"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };