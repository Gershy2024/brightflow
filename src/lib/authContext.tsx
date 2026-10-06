"use client";

import * as React from "react";

const AUTH_STORAGE_KEY = "brightflow_auth_session";
const MASTER_PASSWORD_HASH = "all@1";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string, rememberMe?: boolean) => boolean;
  logout: () => void;
  user: { name: string; email: string } | null;
}

const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: () => false,
  logout: () => {},
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null);

  React.useEffect(() => {
    try {
      // Check localStorage first (remember me) then sessionStorage
      const savedLocal = typeof window !== "undefined" ? localStorage.getItem(AUTH_STORAGE_KEY) : null;
      const savedSession = typeof window !== "undefined" ? sessionStorage.getItem(AUTH_STORAGE_KEY) : null;
      const saved = savedLocal || savedSession;

      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.authenticated) {
          setIsAuthenticated(true);
          setUser({ name: "גרשי", email: "gershy@brightflow.io" });
        }
      }
    } catch (e) {
      console.warn("Auth check error:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (password: string, rememberMe = true) => {
    const valid = password.trim() === MASTER_PASSWORD_HASH || password.trim() === "all@1";
    if (valid) {
      const sessionData = JSON.stringify({
        authenticated: true,
        loginAt: new Date().toISOString(),
      });
      if (rememberMe) {
        localStorage.setItem(AUTH_STORAGE_KEY, sessionData);
      } else {
        sessionStorage.setItem(AUTH_STORAGE_KEY, sessionData);
      }
      setIsAuthenticated(true);
      setUser({ name: "גרשי", email: "gershy@brightflow.io" });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
