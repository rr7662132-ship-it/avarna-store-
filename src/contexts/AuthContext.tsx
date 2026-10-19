import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { saveToStorage, loadFromStorage, removeFromStorage, STORAGE_KEYS } from '../utils/storage';
import { generateId } from '../utils/format';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StoredUser {
  id: string;
  name: string;
  email: string;
  /** Base-64 encoded password (demo only – never do this in production) */
  passwordHash: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const USERS_STORAGE_KEY = 'avarna_users';
const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@avarna.com').toLowerCase().trim();
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

/** Simple base-64 "hash" – acceptable for a demo app. */
function hashPassword(password: string): string {
  return btoa(password);
}

function verifyPassword(password: string, hash: string): boolean {
  return btoa(password) === hash;
}

/** Ensure the admin account exists in the stored user list. */
function seedAdminAccount(users: StoredUser[]): StoredUser[] {
  const adminIndex = users.findIndex((u) => u.email.toLowerCase() === ADMIN_EMAIL);
  if (adminIndex === -1) {
    users.push({
      id: 'admin-001',
      name: 'Store Owner',
      email: ADMIN_EMAIL,
      passwordHash: hashPassword(ADMIN_PASSWORD),
      createdAt: new Date().toISOString(),
    });
  } else {
    users[adminIndex].passwordHash = hashPassword(ADMIN_PASSWORD);
  }
  return users;
}

function storedUserToUser(stored: StoredUser): User {
  return {
    id: stored.id,
    name: stored.name,
    email: stored.email,
    phone: stored.phone,
    avatar: stored.avatar,
    role: stored.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'customer',
    createdAt: stored.createdAt,
  };
}

/* ------------------------------------------------------------------ */
/*  Context & Provider                                                 */
/* ------------------------------------------------------------------ */

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => loadFromStorage<User | null>(STORAGE_KEYS.USER, null));
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const stored = loadFromStorage<User | null>(STORAGE_KEYS.USER, null);
    return stored?.email === ADMIN_EMAIL;
  });

  // Seed admin on first load
  useEffect(() => {
    const users = loadFromStorage<StoredUser[]>(USERS_STORAGE_KEY, []);
    const seeded = seedAdminAccount(users);
    saveToStorage(USERS_STORAGE_KEY, seeded);
  }, []);

  // Persist current user whenever it changes
  useEffect(() => {
    if (user) {
      saveToStorage(STORAGE_KEYS.USER, user);
    } else {
      removeFromStorage(STORAGE_KEYS.USER);
    }
  }, [user]);

  /* ---- Actions ---- */

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const users = loadFromStorage<StoredUser[]>(USERS_STORAGE_KEY, []);
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found || !verifyPassword(password, found.passwordHash)) {
      return false;
    }
    const loggedInUser = storedUserToUser(found);
    setUser(loggedInUser);
    setIsAdmin(loggedInUser.email === ADMIN_EMAIL);
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    const users = loadFromStorage<StoredUser[]>(USERS_STORAGE_KEY, []);
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return false;
    }
    const newStoredUser: StoredUser = {
      id: generateId(),
      name,
      email,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };
    users.push(newStoredUser);
    saveToStorage(USERS_STORAGE_KEY, users);

    const newUser = storedUserToUser(newStoredUser);
    setUser(newUser);
    setIsAdmin(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
    removeFromStorage(STORAGE_KEYS.USER);
    removeFromStorage(STORAGE_KEYS.ADMIN_AUTH);
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };

      // Also update the stored user list
      const users = loadFromStorage<StoredUser[]>(USERS_STORAGE_KEY, []);
      const idx = users.findIndex((u) => u.id === prev.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updates };
        saveToStorage(USERS_STORAGE_KEY, users);
      }

      return updated;
    });
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isAdmin,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to access the AuthContext.
 * Throws if used outside of an AuthProvider.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
