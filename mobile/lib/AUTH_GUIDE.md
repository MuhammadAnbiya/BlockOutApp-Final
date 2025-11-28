# Authentication API Guide

## Overview

BlockOut App menggunakan custom authentication system dengan React hooks dan AsyncStorage untuk persisten token.

## File Structure

```
lib/
├── useAuth.tsx    # React Hook & Context Provider untuk auth state management
└── authApi.ts     # API wrapper functions untuk direct backend calls
```

## Setup

### 1. Install Dependencies

```bash
npm install @react-native-async-storage/async-storage
# atau dengan Expo
expo install @react-native-async-storage/async-storage
```

### 2. Wrap App dengan AuthProvider

Di `app/_layout.tsx`:

```tsx
import { AuthProvider } from "@/lib/useAuth";

export default function RootLayout() {
  return <AuthProvider>{/* Your app content */}</AuthProvider>;
}
```

## Usage with useAuth Hook (Recommended)

### Login

```tsx
import { useAuth } from "@/lib/useAuth";

function SignInScreen() {
  const { login, loading, error, user } = useAuth();

  const handleLogin = async () => {
    try {
      const userData = await login({
        email: "blockout@gmail.com",
        password: "passwordKuat123",
      });
      console.log("Logged in:", userData);
      // Navigate to dashboard
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
```

### Register

```tsx
import { useAuth } from "@/lib/useAuth";

function SignUpScreen() {
  const { register, loading, error } = useAuth();

  const handleRegister = async () => {
    try {
      const userData = await register({
        firstName: "Thomas",
        lastName: "Shelby",
        email: "blockout@gmail.com",
        password: "passwordKuat123",
        phoneNumber: "+628123456789",
        birthDate: "1995-11-15", // Format: YYYY-MM-DD
      });
      console.log("Registered:", userData);
      // Navigate to dashboard
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
```

### Google Login

```tsx
import { useAuth } from "@/lib/useAuth";

function GoogleLoginButton() {
  const { loginWithGoogle, loading } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      // First, get idToken from Google Sign-In SDK
      // Example with @react-native-google-signin/google-signin:
      // const { idToken } = await GoogleSignin.signIn();

      const idToken = "eyJhbGciOiJ..."; // Your Google ID Token

      const userData = await loginWithGoogle({ idToken });
      console.log("Google login success:", userData);
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return <Button title="Login with Google" onPress={handleGoogleLogin} />;
}
```

### Logout

```tsx
import { useAuth } from "@/lib/useAuth";

function LogoutButton() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    console.log("Logged out");
    // Navigate to login screen
  };

  return user ? <Button title="Logout" onPress={handleLogout} /> : null;
}
```

### Access Current User

```tsx
import { useAuth } from "@/lib/useAuth";

function ProfileScreen() {
  const { user, token, loading } = useAuth();

  if (loading) return <Text>Loading...</Text>;
  if (!user) return <Text>Not logged in</Text>;

  return (
    <View>
      <Text>
        Name: {user.firstName} {user.lastName}
      </Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phoneNumber}</Text>
      <Text>Birth Date: {user.birthDate}</Text>
    </View>
  );
}
```

## Direct API Usage (Advanced)

Untuk kasus khusus di luar React components:

```tsx
import { apiLogin, apiRegister, apiLoginWithGoogle } from "@/lib/authApi";

// Login
const loginResult = await apiLogin({
  email: "blockout@gmail.com",
  password: "passwordKuat123",
});

// Register
const registerResult = await apiRegister({
  firstName: "Thomas",
  lastName: "Shelby",
  email: "blockout@gmail.com",
  password: "passwordKuat123",
  phoneNumber: "+628123456789",
  birthDate: "1995-11-15",
});

// Google Login
const googleResult = await apiLoginWithGoogle({
  idToken: "eyJhbGciOiJ...",
});
```

## API Endpoints

| Endpoint             | Method | Payload                                                            | Response          |
| -------------------- | ------ | ------------------------------------------------------------------ | ----------------- |
| `/api/auth/register` | POST   | `{ firstName, lastName, email, password, phoneNumber, birthDate }` | `{ token, user }` |
| `/api/auth/login`    | POST   | `{ email, password }`                                              | `{ token, user }` |
| `/api/auth/google`   | POST   | `{ idToken }`                                                      | `{ token, user }` |

## Configuration

### Change API Base URL

Untuk testing di device fisik, ubah IP dari localhost ke IP mesin Anda:

Di `lib/useAuth.tsx` dan `lib/authApi.ts`, ubah:

```ts
const API_BASE = "http://192.168.1.100:3000/api/auth"; // Ganti dengan IP Anda
```

Atau buat file config:

```ts
// lib/config.ts
export const API_BASE_URL = __DEV__
  ? "http://192.168.1.100:3000/api/auth" // Development
  : "https://api.production.com/auth"; // Production
```

## Error Handling

```tsx
const { login, error } = useAuth();

try {
  await login({ email, password });
} catch (err) {
  // err.message contains error details
  if (err.message.includes("401")) {
    alert("Invalid credentials");
  } else if (err.message.includes("network")) {
    alert("Network error. Check your connection.");
  } else {
    alert("Login failed. Please try again.");
  }
}
```

## TypeScript Types

```ts
type User = {
  id?: string | number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  birthDate?: string;
  [key: string]: any;
};

type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string; // YYYY-MM-DD
};

type LoginPayload = {
  email: string;
  password: string;
};

type GoogleLoginPayload = {
  idToken: string;
};
```

## Tips

1. **Token Storage**: Token disimpan otomatis di AsyncStorage dengan key `@auth_token`
2. **User Persistence**: User data disimpan di AsyncStorage dengan key `@auth_user`
3. **Auto-load on App Start**: useAuth otomatis load token & user dari storage saat app dibuka
4. **Loading State**: Gunakan `loading` untuk menampilkan loading indicator
5. **Error Handling**: Gunakan `error` state untuk menampilkan error message

## Next Steps

- Integrate dengan screen `signin.tsx` dan `signup.tsx`
- Add form validation
- Add loading indicators
- Add error alerts
- Implement token refresh mechanism
- Add logout on 401 responses
