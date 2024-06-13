// // src/app/api/user/route.js

// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firebaseConfig'; // Adjust path as per your project structure

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const usersCollection = collection(db, 'users');
//       const snapshot = await getDocs(usersCollection);
//       const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       res.status(200).json(users);
//     } catch (error) {
//       console.error('Error fetching users: ', error);
//       res.status(500).json({ error: 'Failed to fetch users' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }

export async function GET(reques) {
  return Response("uSer")
}