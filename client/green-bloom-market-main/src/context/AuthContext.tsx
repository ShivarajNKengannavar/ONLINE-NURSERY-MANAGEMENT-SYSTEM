
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name: string;
  joinDate?: string;
  status?: 'active' | 'inactive';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: 'user' | 'admin') => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  registeredUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials
const ADMIN_EMAIL = 'admin098@gmail.com';
const ADMIN_PASSWORD = 'Admin@123';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load registered users
    const storedRegisteredUsers = localStorage.getItem('registeredUsers');
    if (storedRegisteredUsers) {
      setRegisteredUsers(JSON.parse(storedRegisteredUsers));
    }
  }, []);

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if user already exists
    const existingUser = registeredUsers.find(u => u.email === email);
    if (existingUser) {
      return false;
    }

    // Check if trying to register with admin email
    if (email === ADMIN_EMAIL) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'user',
      joinDate: new Date().toLocaleDateString(),
      status: 'active'
    };

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    localStorage.setItem(`user-password-${email}`, password);
    
    return true;
  };

  const login = async (email: string, password: string, role: 'user' | 'admin' = 'user'): Promise<boolean> => {
    // Check admin credentials
    if (role === 'admin') {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser: User = {
          id: 'admin-1',
          email: ADMIN_EMAIL,
          name: 'Admin',
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return true;
      }
      return false;
    }

    // Check registered user credentials
    const registeredUser = registeredUsers.find(u => u.email === email);
    const storedPassword = localStorage.getItem(`user-password-${email}`);
    
    if (registeredUser && storedPassword === password) {
      setUser(registeredUser);
      localStorage.setItem('user', JSON.stringify(registeredUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      isAdmin,
      registeredUsers
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
