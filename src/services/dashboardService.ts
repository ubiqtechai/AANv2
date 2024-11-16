import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';

// Projects
export function subscribeToProjects(userId: string, callback: Function) {
  const q = query(
    collection(db, 'projects'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(projects);
  });
}

export async function createProject(projectData: any) {
  return addDoc(collection(db, 'projects'), {
    ...projectData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

// Jurisdictions
export function subscribeToJurisdictionUpdates(jurisdictions: string[], callback: Function) {
  const q = query(
    collection(db, 'jurisdictionUpdates'),
    where('jurisdiction', 'in', jurisdictions),
    orderBy('date', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const updates = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(updates);
  });
}

// Content
export function subscribeToContent(userId: string, callback: Function) {
  const q = query(
    collection(db, 'content'),
    where('authorId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const content = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(content);
  });
}

export async function createContent(contentData: any) {
  return addDoc(collection(db, 'content'), {
    ...contentData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

// Marketing Analytics
export async function getMarketingStats(userId: string) {
  const statsRef = doc(db, 'marketingStats', userId);
  const snapshot = await getDocs(collection(statsRef, 'monthly'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// Client Requirements
export function subscribeToClientRequirements(userId: string, callback: Function) {
  const q = query(
    collection(db, 'clientRequirements'),
    where('partnerId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const requirements = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(requirements);
  });
}

export async function createClientRequirement(requirementData: any) {
  return addDoc(collection(db, 'clientRequirements'), {
    ...requirementData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

// User Settings
export async function updateUserSettings(userId: string, settings: any) {
  const userRef = doc(db, 'users', userId);
  return updateDoc(userRef, {
    settings,
    updatedAt: serverTimestamp()
  });
}

// Notifications
export function subscribeToNotifications(userId: string, callback: Function) {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    where('read', '==', false),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(notifications);
  });
}

export async function markNotificationAsRead(notificationId: string) {
  const notificationRef = doc(db, 'notifications', notificationId);
  return updateDoc(notificationRef, {
    read: true,
    updatedAt: serverTimestamp()
  });
}