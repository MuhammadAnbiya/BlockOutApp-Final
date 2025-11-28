import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// NOTE: If `@react-native-async-storage/async-storage` is not installed in your project,
// install it with: npm install @react-native-async-storage/async-storage
// or: expo install @react-native-async-storage/async-storage

type User = {
  id?: string | number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  birthDate?: string;
  [key: string]: any;
};

// Register payload matching backend spec
type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string; // Format: YYYY-MM-DD
};

// Login payload
type LoginPayload = {
  email: string;
  password: string;
};

// Google login payload
type GoogleLoginPayload = {
  idToken: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<User | null>;
  register: (payload: RegisterPayload) => Promise<User | null>;
  loginWithGoogle: (payload: GoogleLoginPayload) => Promise<User | null>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

const AUTH_TOKEN_KEY = "@auth_token";
const AUTH_USER_KEY = "@auth_user";

const API_BASE = "http://localhost:3000/api/auth"; // per your spec

async function saveToken(token: string | null) {
  if (token) {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

async function saveUser(user: User | null) {
  if (user) {
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } else {
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load saved auth from storage on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const t = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        const u = await AsyncStorage.getItem(AUTH_USER_KEY);
        if (!mounted) return;
        if (t) setToken(t);
        if (u) setUser(JSON.parse(u));
      } catch (err) {
        console.warn("AuthProvider: error reading storage", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // helper to apply token+user after successful auth
  const applyAuth = async (
    incomingToken: string | null,
    incomingUser: User | null
  ) => {
    setToken(incomingToken);
    setUser(incomingUser);
    await saveToken(incomingToken);
    await saveUser(incomingUser);
  };

  const login = async ({ email, password }: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (!res.ok) {
        const message = json?.message || `Login failed (${res.status})`;
        setError(message);
        throw new Error(message);
      }

      // Expecting backend to return { token, user } or { accessToken, user }
      const incomingToken = json.token || json.accessToken || null;
      const incomingUser = json.user || json.data || null;

      await applyAuth(incomingToken, incomingUser);
      return incomingUser;
    } catch (err: any) {
      setError(err?.message || "Login error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    birthDate,
  }: RegisterPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          birthDate,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        const message = json?.message || `Register failed (${res.status})`;
        setError(message);
        throw new Error(message);
      }

      const incomingToken = json.token || json.accessToken || null;
      const incomingUser = json.user || json.data || null;

      await applyAuth(incomingToken, incomingUser);
      return incomingUser;
    } catch (err: any) {
      setError(err?.message || "Register error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async ({ idToken }: GoogleLoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const json = await res.json();
      if (!res.ok) {
        const message = json?.message || `Google login failed (${res.status})`;
        setError(message);
        throw new Error(message);
      }

      const incomingToken = json.token || json.accessToken || null;
      const incomingUser = json.user || json.data || null;

      await applyAuth(incomingToken, incomingUser);
      return incomingUser;
    } catch (err: any) {
      setError(err?.message || "Google login error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await saveToken(null);
      await saveUser(null);
      setToken(null);
      setUser(null);
      setError(null);
    } catch (err) {
      console.warn("logout error", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!token) return null;
    setLoading(true);
    setError(null);
    try {
      // If your backend exposes a /me endpoint, you can call it here. We'll try /me first then /user
      const endpoints = [
        `${API_BASE}/me`,
        `${API_BASE}/user`,
        `${API_BASE}/profile`,
      ];
      let json: any = null;
      let ok = false;
      for (const url of endpoints) {
        try {
          const res = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          json = await res.json();
          if (res.ok) {
            ok = true;
            break;
          }
        } catch (e) {
          // try next
        }
      }

      if (!ok) {
        // If refresh failed, just keep current user
        return null;
      }

      const incomingUser = json.user || json.data || json;
      setUser(incomingUser);
      await saveUser(incomingUser);
      return incomingUser;
    } catch (err) {
      setError((err as Error).message || "Refresh user error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      login,
      register,
      loginWithGoogle,
      logout,
      refreshUser,
    }),
    [user, token, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthState => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
