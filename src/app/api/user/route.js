import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function GET(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => doc.data());
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Error fetching products" });
  }
}
