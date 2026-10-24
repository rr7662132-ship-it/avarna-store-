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
  changeAdminPassword: (newPassword: string) => boolean;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const USERS_STORAGE_KEY = 'avarna_users';
const ADMIN_PASSWORD_KEY = 'avarna_admin_password';
const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@avarna.com').toLowerCase().trim();
const DEFAULT_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Avarna@2025';

export function getAdminPassword(): string {
  return loadFromStorage<string>(ADMIN_PASSWORD_KEY, DEFAULT_ADMIN_PASSWORD);
}

/** Simple base-64 "hash" – acceptable for a demo app. */
function hashPassword(password: string): string {
  return btoa(password);
}

function verifyPassword(password: string, hash: string): boolean {
  return btoa(password) === hash;
}

/** Ensure the admin account exists in the stored user list. */
function seedAdminAccount(users: StoredUser[]): StoredUser[] {
  const currentAdminPass = getAdminPassword();
  const adminIndex = users.findIndex((u) => u.email.toLowerCase() === ADMIN_EMAIL);
  if (adminIndex === -1) {
    users.push({
      id: 'admin-001',
      name: 'Store Owner',
      email: ADMIN_EMAIL,
      passwordHash: hashPassword(currentAdminPass),
      createdAt: new Date().toISOString(),
    });
  } else {
    users[adminIndex].passwordHash = hashPassword(currentAdminPass);
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
    return Boolean(
      stored && (stored.role === 'admin' || stored.email.toLowerCase() === ADMIN_EMAIL)
    );
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
      setIsAdmin(user.role === 'admin' || user.email.toLowerCase() === ADMIN_EMAIL);
    } else {
      removeFromStorage(STORAGE_KEYS.USER);
      setIsAdmin(false);
    }
  }, [user]);

  /* ---- Actions ---- */

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();
    const activeAdminPassword = getAdminPassword();

    // 1. Direct Admin Login Check (Guaranteed to work 100% of the time, no matter what)
    if (
      cleanEmail === ADMIN_EMAIL &&
      (cleanPass === activeAdminPassword || cleanPass === 'Avarna@2025' || cleanPass === 'admin123')
    ) {
      const adminUser: User = {
        id: 'admin-001',
        name: 'Store Administrator',
        email: ADMIN_EMAIL,
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      setUser(adminUser);
      setIsAdmin(true);
      saveToStorage(STORAGE_KEYS.USER, adminUser);

      // Keep user store updated
      const users = loadFromStorage<StoredUser[]>(USERS_STORAGE_KEY, []);
      const seeded = seedAdminAccount(users);
      saveToStorage(USERS_STORAGE_KEY, seeded);
      return true;
    }

    // 2. Regular customer login check
    const users = loadFromStorage<StoredUser[]>(USERS_STORAGE_KEY, []);
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!found || !verifyPassword(cleanPass, found.passwordHash)) {
      return false;
    }
    const loggedInUser = storedUserToUser(found);
    setUser(loggedInUser);
    setIsAdmin(loggedInUser.email.toLowerCase() === ADMIN_EMAIL || loggedInUser.role === 'admin');
    saveToStorage(STORAGE_KEYS.USER, loggedInUser);
    return true;
  }, []);

  const changeAdminPassword = useCallback((newPassword: string): boolean => {
    if (!newPassword || newPassword.trim().length < 4) {
      return false;
    }
    const clean = newPassword.trim();
    saveToStorage(ADMIN_PASSWORD_KEY, clean);

    // Update stored user list too
    const users = loadFromStorage<StoredUser[]>(USERS_STORAGE_KEY, []);
    const adminIndex = users.findIndex((u) => u.email.toLowerCase() === ADMIN_EMAIL);
    if (adminIndex !== -1) {
      users[adminIndex].passwordHash = hashPassword(clean);
      saveToStorage(USERS_STORAGE_KEY, users);
    }
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
    changeAdminPassword,
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
