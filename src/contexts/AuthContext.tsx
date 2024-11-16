import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, initializeFirebase } from '../lib/firebase';

interface UserData {
  id: string;
  email: string;
  role: 'user' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  error: null
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: () => void;

    const initialize = async () => {
      try {
        await initializeFirebase();
        
        unsubscribe = onAuthStateChanged(auth, async (user) => {
          setUser(user);
          setLoading(true);
          setError(null);

          if (user) {
            try {
              const userRef = doc(db, 'users', user.uid);
              const userDoc = await getDoc(userRef);
              
              if (userDoc.exists()) {
                setUserData({
                  id: userDoc.id,
                  ...userDoc.data()
                } as UserData);
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
              setError('Unable to fetch user data');
            }
          } else {
            setUserData(null);
          }
          
          setLoading(false);
        });
      } catch (error) {
        console.error('Error initializing Firebase:', error);
        setError('Unable to initialize application');
        setLoading(false);
      }
    };

    initialize();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);