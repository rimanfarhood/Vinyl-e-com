import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore'
import app from '../firebase'

const db = getFirestore(app)

export async function getProducts() {
  const snapshot = await getDocs(collection(db, 'vinyl_webp'))
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
}

export async function getProductById(id) {
  const snapshot = await getDoc(doc(db, 'vinyl_webp', id))
  if (!snapshot.exists()) return null
  return { ...snapshot.data(), id: snapshot.id }
}
