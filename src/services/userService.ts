import { auth, db } from '@/lib/firebase';
import { 
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
  Timestamp,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import type { User } from '@/types';

export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const userRef = doc(db, 'users', auth.currentUser!.uid);
    const userDoc = {
      ...userData,
      id: auth.currentUser!.uid,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    await setDoc(userRef, userDoc);
    return userDoc;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user profile');
  }
}

export async function updateUserStatus(userId: string, status: 'approved' | 'rejected') {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      status,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    throw new Error(`Failed to ${status} user`);
  }
}

export function subscribeToUsers(callback: (users: User[]) => void, onError: (error: Error) => void) {
  const q = query(
    collection(db, 'users'),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, 
    (snapshot) => {
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
      callback(users);
    },
    (error) => {
      console.error('Error subscribing to users:', error);
      onError(error);
    }
  );
}

export function subscribeToPendingUsers(callback: (users: User[]) => void, onError: (error: Error) => void) {
  const q = query(
    collection(db, 'users'),
    where('status', '==', 'pending'),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q,
    (snapshot) => {
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
      callback(users);
    },
    (error) => {
      console.error('Error subscribing to pending users:', error);
      onError(error);
    }
  );
}