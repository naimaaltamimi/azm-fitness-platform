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
const USERS_REGISTRY_KEY = 'azm_users_registry';

// Official Platform Administrator Account
const OFFICIAL_ADMIN: UserProfile = {
  id: 'user-admin-official',
  name: 'المدير التنفيذي لمنصة عزم',
  email: 'admin@azm.ye',
  phone: '770000000',
  city: 'المكلا',
  neighborhood: 'المكلا',
  role: 'admin',
  password: 'admin',
  avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
};

const getRegisteredUsers = (): UserProfile[] => {
  try {
    const raw = localStorage.getItem(USERS_REGISTRY_KEY);
    if (!raw) {
      const initial = [OFFICIAL_ADMIN];
      localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed: UserProfile[] = JSON.parse(raw);
    if (!parsed.some((u) => u.email.toLowerCase() === OFFICIAL_ADMIN.email.toLowerCase())) {
      parsed.unshift(OFFICIAL_ADMIN);
      localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return [OFFICIAL_ADMIN];
  }
};

const saveRegisteredUser = (newUser: UserProfile) => {
  const users = getRegisteredUsers();
  const existingIdx = users.findIndex((u) => u.email.toLowerCase() === newUser.email.toLowerCase());
  if (existingIdx !== -1) {
    users[existingIdx] = newUser;
  } else {
    users.push(newUser);
  }
  localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(users));
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
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    const cleanEmail = email.toLowerCase().trim();
    const cleanPass = pass.trim();

    const users = getRegisteredUsers();
    const foundUser = users.find((u) => u.email.toLowerCase().trim() === cleanEmail);

    // If matching official admin or matching password
    if (foundUser) {
      if (!foundUser.password || foundUser.password === cleanPass || cleanEmail === 'admin@azm.ye') {
        setUser(foundUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(foundUser));
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, message: 'كلمة المرور غير صحيحة، يرجى المحاولة مجدداً.' };
    }

    setIsLoading(false);
    return {
      success: false,
      message: 'البريد الإلكتروني غير مسجل في المنظومة. يمكنك إنشاء حساب جديد مجاناً.'
    };
  };

  const loginAsDemo = (role: UserRole) => {
    const users = getRegisteredUsers();
    const found = users.find((u) => u.role === role) || OFFICIAL_ADMIN;
    setUser(found);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(found));
  };

  const register = async (profileData: Partial<UserProfile>) => {
    setIsLoading(true);
    const cleanEmail = (profileData.email || '').toLowerCase().trim();

    const users = getRegisteredUsers();
    const alreadyExists = users.some((u) => u.email.toLowerCase().trim() === cleanEmail);

    if (alreadyExists) {
      setIsLoading(false);
      return {
        success: false,
        message: 'هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول أو استخدام بريد آخر.'
      };
    }

    const newUser: UserProfile = {
      id: 'user-' + Date.now().toString(36),
      name: profileData.name || 'عضو جديد',
      email: cleanEmail,
      phone: profileData.phone || '',
      city: 'المكلا',
      neighborhood: profileData.neighborhood || 'الشرج',
      role: profileData.role || 'trainee',
      password: profileData.password,
      fitnessGoal: profileData.fitnessGoal || 'fitness_maintenance',
      weight: profileData.weight || 72,
      height: profileData.height || 174,
      age: profileData.age || 24,
      gender: profileData.gender || 'male',
      activityLevel: profileData.activityLevel || 'moderate',
      targetCalories: 2500,
      avatarUrl:
        profileData.avatarUrl ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
    };

    saveRegisteredUser(newUser);
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
    saveRegisteredUser(updated);
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
