import {
  AuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  signInWithPopup
} from 'firebase/auth'
import app from './firebaseConfig'

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

const twitterProvider = new TwitterAuthProvider()

const authUser = async (provider: AuthProvider) => {
  try {
    const result = await signInWithPopup(auth, provider)
    const { user } = result
    return user
  } catch (error) {
    console.error(error)
  }
}

export { auth, googleProvider, twitterProvider, authUser }
