import { API_BASE_URL } from '../constants/api';

/**
 * API Wrapper for BlockOut Authentication
 * * Updated to use centralized API_BASE_URL from constants.
 */

// Base URL khusus untuk Auth (http://10.5.50.207:3000/api/auth)
const AUTH_URL = `${API_BASE_URL}/auth`;

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
  accessToken?: string;
  refreshToken?: string; // Ditambahkan sesuai backend baru
  user?: any;
  message?: string;
  error?: string; // Ditambahkan untuk error handling
};

/**
 * Register a new user
 */
export async function apiRegister(
  payload: RegisterPayload
): Promise<AuthResponse> {
  console.log("Registering to:", `${AUTH_URL}/register`); // Debugging Log

  const res = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    // Backend kita mengirim "error", kode lama mencari "message". Kita cek dua-duanya.
    throw new Error(json?.error || json?.message || `Registration failed (${res.status})`);
  }

  return json;
}

/**
 * Login with email and password
 */
export async function apiLogin(payload: LoginPayload): Promise<AuthResponse> {
  console.log("Logging in to:", `${AUTH_URL}/login`); // Debugging Log

  const res = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.error || json?.message || `Login failed (${res.status})`);
  }

  return json;
}

/**
 * Login with Google ID Token
 */
export async function apiLoginWithGoogle(
  payload: GoogleLoginPayload
): Promise<AuthResponse> {
  const res = await fetch(`${AUTH_URL}/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.error || json?.message || `Google login failed (${res.status})`);
  }

  return json;
}

/**
 * Fetch user profile with bearer token
 * Menggunakan endpoint /api/user/profile yang sudah kita buat di backend
 */
export async function apiGetUserProfile(token: string): Promise<any> {
  // Arahkan ke endpoint profile yang benar
  const url = `${API_BASE_URL}/user/profile`; 

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
       throw new Error(json?.error || "Failed to fetch profile");
    }

    // Backend /user/profile mengembalikan object { user: {...}, statistics: [...] }
    // Kita kembalikan user-nya saja atau full json tergantung kebutuhan UI
    return json.user || json; 

  } catch (err) {
    console.error("Profile Fetch Error:", err);
    throw err;
  }
}

export const getApiBaseUrl = () => AUTH_URL;

export type MintPayload = {
  workoutType: string;
  count: number;
  duration: number;
  walletAddress?: string; // Opsional jika user belum connect wallet
};

export async function apiMintReward(payload: MintPayload, token: string) {
  const res = await fetch(`${API_BASE_URL}/reward/mint`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.error || "Minting failed");
  }
  return json;
}