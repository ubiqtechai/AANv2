import { auth, db, initializeFirebase } from './firebase';
import { 
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const ADMIN_EMAIL = 'admin@aumirahalliance.com';
const ADMIN_PASSWORD = 'Admin@123';

export async function initializeAdmin(retryCount = 0) {
  try {
    // Ensure Firebase is initialized
    await initializeFirebase();

    // Check if admin account exists
    const signInMethods = await fetchSignInMethodsForEmail(auth, ADMIN_EMAIL);
    
    if (signInMethods.length === 0) {
      // Sign in with admin credentials
      const userCredential = await signInWithEmailAndPassword(
        auth,
        ADMIN_EMAIL,
        ADMIN_PASSWORD
      );

      // Check if admin profile exists in Firestore
      const adminDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (!adminDoc.exists()) {
        // Create admin profile in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          id: userCredential.user.uid,
          username: 'admin',
          fullName: 'AAN Administrator',
          email: ADMIN_EMAIL,
          phone: '+1234567890',
          primaryJurisdiction: 'Global',
          officeAddress: 'AAN Headquarters',
          teamSize: 1,
          yearsOfExperience: 10,
          specialtyAreas: ['Administration'],
          status: 'approved',
          role: 'admin',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      // Sign out after initialization
      await auth.signOut();
      console.log('Admin account verified successfully');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
    
    if (retryCount < 3 && (
      error.code === 'auth/network-request-failed' ||
      error.code === 'unavailable'
    )) {
      console.log(`Retrying admin initialization (attempt ${retryCount + 1}/3)...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return initializeAdmin(retryCount + 1);
    }
    
    throw error;
  }
}