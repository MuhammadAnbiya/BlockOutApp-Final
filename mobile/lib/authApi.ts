/**
 * API Wrapper for BlockOut Authentication
 *
 * This file provides typed API functions for direct backend calls.
 * For most cases, use the useAuth() hook instead which handles state management.
 *
 * Use these functions when you need to call the API outside of React components
 * or for testing purposes.
 */

const API_BASE = "http://localhost:3000/api/auth";

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string; // Format: YYYY-MM-DD (e.g., "1995-11-15")
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type GoogleLoginPayload = {
  idToken: string;
};

export type AuthResponse = {
  token?: string;
  accessToken?: string;
  user?: any;
  data?: any;
  message?: string;
};

/**
 * Register a new user
 * @param payload - User registration data
 * @returns Promise with auth response
 * @example
 * ```ts
 * const result = await apiRegister({
 *   firstName: "Thomas",
 *   lastName: "Shelby",
 *   email: "blockout@gmail.com",
 *   password: "passwordKuat123",
 *   phoneNumber: "+628123456789",
 *   birthDate: "1995-11-15"
 * });
 * ```
 */
export async function apiRegister(
  payload: RegisterPayload
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || `Registration failed (${res.status})`);
  }

  return json;
}

/**
 * Login with email and password
 * @param payload - Login credentials
 * @returns Promise with auth response
 * @example
 * ```ts
 * const result = await apiLogin({
 *   email: "blockout@gmail.com",
 *   password: "passwordKuat123"
 * });
 * ```
 */
export async function apiLogin(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || `Login failed (${res.status})`);
  }

  return json;
}

/**
 * Login with Google ID Token
 * @param payload - Google authentication data
 * @returns Promise with auth response
 * @example
 * ```ts
 * const result = await apiLoginWithGoogle({
 *   idToken: "eyJhbGciOiJ..."
 * });
 * ```
 */
export async function apiLoginWithGoogle(
  payload: GoogleLoginPayload
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || `Google login failed (${res.status})`);
  }

  return json;
}

/**
 * Fetch user profile with bearer token
 * @param token - JWT token
 * @returns Promise with user data
 */
export async function apiGetUserProfile(token: string): Promise<any> {
  const endpoints = [
    `${API_BASE}/me`,
    `${API_BASE}/user`,
    `${API_BASE}/profile`,
  ];

  let lastError: Error | null = null;

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (res.ok) {
        return json.user || json.data || json;
      }
    } catch (err) {
      lastError = err as Error;
    }
  }

  throw lastError || new Error("Failed to fetch user profile");
}

/**
 * Change the API base URL (useful for switching between dev/staging/prod)
 * @param newBaseUrl - New base URL (e.g., "http://192.168.1.100:3000/api/auth")
 */
export function setApiBaseUrl(newBaseUrl: string): void {
  // Note: This is a simple implementation. For production, consider using environment variables
  // or a more robust configuration system
  console.warn(
    "setApiBaseUrl is not implemented in this static version. Update API_BASE constant directly."
  );
}

// Export the current API base for reference
export const getApiBaseUrl = () => API_BASE;
