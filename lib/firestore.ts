import { collection, getFirestore } from 'firebase/firestore'
import app from './firebaseConfig'

const db = getFirestore(app)

const usersCollection = collection(db, 'usuarios')

export { db, usersCollection }
