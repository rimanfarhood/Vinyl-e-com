import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore'
import app from '../firebase'

const db = getFirestore(app)

export async function getProducts() {
  const snapshot = await getDocs(collection(db, 'vinkyl'))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function getProductById(id) {
  const snapshot = await getDoc(doc(db, 'vinkyl', id))
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}
