import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDlfWaJraCy5RcBMMl6ItIuHhee0uLmtYw",
  authDomain: "excellent-d4289.firebaseapp.com",
  projectId: "excellent-d4289",
  storageBucket: "excellent-d4289.appspot.com",
  messagingSenderId: "556913287935",
  appId: "1:556913287935:web:2dce529eefb6ae101022ca",
  measurementId: "G-ZJJ3WTLNGD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
