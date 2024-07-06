import { initializeApp, getApp, getApps } from "firebase/app";
// import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCsy793olT_wBPcJONufCFlxeSWqnQCOi4",
  authDomain: "newproject-c5039.firebaseapp.com",
  projectId: "newproject-c5039",
  storageBucket: "newproject-c5039.appspot.com",
  messagingSenderId: "236238370869",
  appId: "1:236238370869:web:26f6989eacf184e003997c",
  measurementId: "G-P66CPP3K6C"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Set session persistence
// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
//     console.log('Session persistence set');
//   })
//   .catch((error) => {
//     console.error('Error setting session persistence:', error);
//   });
export { db, storage, auth, app };
