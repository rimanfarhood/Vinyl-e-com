import { getFirestore, collection, getDocs } from 'firebase/firestore'
import app from '../firebase'

const db = getFirestore(app)

export async function getProducts() {
  const snapshot = await getDocs(collection(db, 'vinkyl'))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
