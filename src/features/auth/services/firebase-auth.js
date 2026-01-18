import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut 
} from 'firebase/auth';

import { auth } from '@/lib/firebase';

export const firebaseAuthService = {
  login: async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

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

  logout: async () => {
    return await signOut(auth);
  },

  getAuth: () => auth
};
