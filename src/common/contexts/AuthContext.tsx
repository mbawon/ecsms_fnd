import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserInfo = {
  name: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  role: string | null;
  user: UserInfo | null;
  login: (userRole: string, userInfo: UserInfo) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>("admin");
  const [user, setUser] = useState<UserInfo | null>(null);
  // const isAuthenticated = !!role && !!user;
  const isAuthenticated = true;

  // Load the stored role and user info from AsyncStorage when the app starts
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('userRole');
        const storedUser = await AsyncStorage.getItem('userInfo');
        if (storedRole && storedUser) {
          setRole(storedRole);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load role or user info from AsyncStorage:', error);
      }
    };

    loadStoredData();
  }, []);

  const login = async (userRole: string, userInfo: UserInfo) => {
    try {
      // Store the role and user info in AsyncStorage
      await AsyncStorage.setItem('userRole', userRole);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

      setRole(userRole);
      setUser(userInfo);
    } catch (error) {
      console.error('Failed to save role or user info to AsyncStorage:', error);
    }
  };

  const logout = async () => {
    try {
      // Clear the role and user info from AsyncStorage
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userInfo');

      setRole(null);
      setUser(null);
    } catch (error) {
      console.error('Failed to remove role or user info from AsyncStorage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
