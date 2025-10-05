import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

/**
 * Service for handling Firebase authentication operations
 */
export const firebaseAuthService = {
  /**
   * Sign in a user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<UserCredential>} Firebase user credential
   */
  login: async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  /**
   * Create a new user account with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} displayName - User display name
   * @returns {Promise<void>}
   */
  signup: async (email, password, displayName) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        try { 
          await updateProfile(cred.user, { displayName }); 
        } catch (err) {
          console.error('Failed to update profile:', err);
        }
      }
      return cred;
    } catch (err) {
      const code = err?.code || '';
      if (code === 'auth/email-already-in-use') {
        throw new Error('An account with this email already exists. Please sign in instead.');
      }
      throw err;
    }
  },

  /**
   * Sign out the current user
   * @returns {Promise<void>}
   */
  logout: async () => {
    return await signOut(auth);
  },

  /**
   * Get the current Firebase auth instance
   * @returns {Auth} Firebase auth instance
   */
  getAuth: () => auth
};
