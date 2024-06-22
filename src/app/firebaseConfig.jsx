import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDlfWaJraCy5RcBMMl6ItIuHhee0uLmtYw",
  authDomain: "excellent-d4289.firebaseapp.com",
  projectId: "excellent-d4289",
  storageBucket: "excellent-d4289.appspot.com",
  messagingSenderId: "556913287935",
  appId: "1:556913287935:web:2dce529eefb6ae101022ca",
  measurementId: "G-ZJJ3WTLNGD"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Set session persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log('Session persistence set');
  })
  .catch((error) => {
    console.error('Error setting session persistence:', error);
  });
export { db, storage, auth, app };
