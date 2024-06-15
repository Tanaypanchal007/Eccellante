import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the import based on your Firebase configuration

export async function fetchDataFromFirestore(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}
