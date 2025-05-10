import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock user data
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Writer, tech enthusiast, and coffee lover. Sharing thoughts on the digital world.',
    joinedAt: '2023-01-15T12:00:00Z',
    followers: 128,
    following: 76,
  };
  
  useEffect(() => {
    // Simulate loading user from storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // For demo purposes, uncomment to auto-login with mock user
    // setUser(mockUser);
    
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, any email/password combination works
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    setLoading(false);
  };
  
  const register = async (name: string, email: string, password: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a new user based on the mock user but with provided name and email
    const newUser: User = {
      ...mockUser,
      name,
      email,
      // Generate a random username based on name
      username: name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000),
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    setLoading(false);
  };
  
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};