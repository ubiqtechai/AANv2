import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence,
  connectAuthEmulator 
} from 'firebase/auth';
import { 
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  connectFirestoreEmulator,
  enableIndexedDbPersistence
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAjxNZiRSEOi96wkro28bHj0TZHVSk3zWg",
  authDomain: "aumirahalliancenetwork.firebaseapp.com",
  projectId: "aumirahalliancenetwork",
  storageBucket: "aumirahalliancenetwork.firebasestorage.app",
  messagingSenderId: "974862442022",
  appId: "1:974862442022:web:7f04db7cf5b7abc39c10e7",
  measurementId: "G-VXQE3LCYD5"
};

// Initialize Firebase with retry mechanism
let app;
let auth;
let db;

const initializeFirebase = async (retryCount = 0) => {
  try {
    if (!app) {
      app = initializeApp(firebaseConfig);
    }

    if (!auth) {
      auth = getAuth(app);
      await setPersistence(auth, browserLocalPersistence);
    }

    if (!db) {
      db = initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager()
        })
      });

      try {
        await enableIndexedDbPersistence(db);
        console.log('Offline persistence enabled');
      } catch (err) {
        if (err.code === 'failed-precondition') {
          console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code === 'unimplemented') {
          console.warn('The current browser does not support offline persistence');
        }
      }
    }

    return { app, auth, db };
  } catch (error) {
    console.error('Firebase initialization error:', error);
    
    if (retryCount < 3) {
      console.log(`Retrying Firebase initialization (attempt ${retryCount + 1}/3)...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return initializeFirebase(retryCount + 1);
    }
    
    throw error;
  }
};

// Initialize Firebase immediately
initializeFirebase().catch(console.error);

export { app, auth, db, initializeFirebase };