import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  loginAsDemo: (role: UserRole) => void;
  register: (profileData: Partial<UserProfile>) => Promise<{ success: boolean; message?: string }>;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  logout: () => void;
}

const AUTH_STORAGE_KEY = 'azm_auth_user';

const DEMO_USERS: Record<UserRole, UserProfile> = {
  trainee: {
    id: 'user-trainee-1',
    name: 'سالم أحمد باحشوان',
    email: 'salem@azm-mukalla.com',
    phone: '+967 771 234 567',
    city: 'المكلا',
    neighborhood: 'الشرج',
    role: 'trainee',
    fitnessGoal: 'muscle_gain',
    weight: 74,
    height: 176,
    age: 26,
    gender: 'male',
    activityLevel: 'moderate',
    targetCalories: 2650,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
  },
  trainer: {
    id: 'user-trainer-1',
    name: 'الكابتن / معاذ بامعروف',
    email: 'coach.muadh@azm-mukalla.com',
    phone: '+967 770 123 456',
    city: 'المكلا',
    neighborhood: 'الشرج',
    role: 'trainer',
    avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=300&q=80'
  },
  gym_owner: {
    id: 'user-owner-1',
    name: 'إدارة سمارت جيم المكلا',
    email: 'smartgym@azm-mukalla.com',
    phone: '+967 733 444 520',
    city: 'المكلا',
    neighborhood: 'الشرج',
    role: 'gym_owner',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
  },
  admin: {
    id: 'user-admin-1',
    name: 'المدير التنفيذي لمنصة عزم',
    email: 'admin@azm.ye',
    phone: '+967 777 000 111',
    city: 'المكلا',
    neighborhood: 'المكلا',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default to null so visitor browses freely as required!
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, _pass: string) => {
    setIsLoading(true);
    // Simulated check or demo login
    const foundRole = (Object.keys(DEMO_USERS) as UserRole[]).find(
      (r) => DEMO_USERS[r].email.toLowerCase() === email.toLowerCase().trim()
    );

    const loggedUser = foundRole
      ? DEMO_USERS[foundRole]
      : {
          id: 'user-' + Date.now().toString(36),
          name: email.split('@')[0],
          email,
          phone: '+967 770 000 000',
          city: 'المكلا',
          neighborhood: 'المكلا',
          role: 'trainee' as UserRole,
          fitnessGoal: 'fitness_maintenance' as const,
          weight: 70,
          height: 175,
          age: 25,
          gender: 'male' as const,
          activityLevel: 'moderate' as const,
          targetCalories: 2400
        };

    setUser(loggedUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedUser));
    setIsLoading(false);
    return { success: true };
  };

  const loginAsDemo = (role: UserRole) => {
    const demo = DEMO_USERS[role];
    setUser(demo);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demo));
  };

  const register = async (profileData: Partial<UserProfile>) => {
    setIsLoading(true);
    const newUser: UserProfile = {
      id: 'user-' + Date.now().toString(36),
      name: profileData.name || 'مشترك جديد',
      email: profileData.email || 'user@azm-mukalla.com',
      phone: profileData.phone || '+967 770 000 000',
      city: 'المكلا',
      neighborhood: profileData.neighborhood || 'الشرج',
      role: profileData.role || 'trainee',
      fitnessGoal: profileData.fitnessGoal || 'fitness_maintenance',
      weight: profileData.weight || 72,
      height: profileData.height || 174,
      age: profileData.age || 24,
      gender: profileData.gender || 'male',
      activityLevel: profileData.activityLevel || 'moderate',
      targetCalories: 2500
    };

    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAsDemo,
        register,
        updateProfile,
        logout
      }}
    >
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

