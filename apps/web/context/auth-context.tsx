"use client";

import { LoginData, User } from "@repo/schema";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  setAccessToken,
  setRefreshToken,
  setOnTokenRefresh,
  getMe,
} from "@repo/api-client";
import { toast } from "sonner";

type AuthState = {
  isLoggedIn: boolean;
  login: (data: LoginData) => void;
  updateLoginData: (data: Partial<LoginData>) => void;
  logout: () => void;
  isReady: boolean;
  loginData: LoginData | null;
  user: User | null;
};

const authStorageKey = "auth-key";

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  login: () => {},
  updateLoginData: () => {},
  logout: () => {},
  isReady: false,
  loginData: null,
  user: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  const isLoggedIn = !!loginData;

  // store the authToken in localStorage
  const storeAuthState = (data: LoginData) => {
    try {
      setAccessToken(data?.accessToken);
      setRefreshToken(data?.refreshToken);
      localStorage.setItem(authStorageKey, JSON.stringify(data));
    } catch (error) {
      console.error("Error storing auth state:", error);
    }
  };

  const logIn = (data: LoginData) => {
    setLoginData(data);
    storeAuthState(data);
    if (data?.onboardingCompleted) {
      router.replace("/practice");
    } else {
      router.replace("/domain-selection");
    }
  };

  const updateLoginData = (data: Partial<LoginData>) => {
    if (loginData) {
      const updatedData = { ...loginData, ...data };
      setLoginData(updatedData);
      storeAuthState(updatedData);
    }
  };

  const logOut = () => {
    setLoginData(null);
    setUser(null);
    localStorage.removeItem(authStorageKey);
    setAccessToken("");
    setRefreshToken("");
    router.replace("/login");
  };

  // fetching the auth state from localStorage
  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const authData = localStorage.getItem(authStorageKey);

        if (authData) {
          const data = JSON.parse(authData);
          setLoginData(data);
          setAccessToken(data?.accessToken);
          setRefreshToken(data?.refreshToken);

          // verify the token from the server
          try {
            const userData = await getMe();
            setUser(userData);
          } catch (error) {
            console.error("Session verification failed:", error);
            toast.error("Your session has expired. Please login again.");
            logOut();
          }
        }
      } catch (error) {
        console.error("Error fetching auth state:", error);
      } finally {
        setIsReady(true);
      }
    };

    getAuthFromStorage();

    // Listen for token refresh events from the API client
    setOnTokenRefresh(({ accessToken, refreshToken }) => {
      updateLoginData({ accessToken, refreshToken });
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isReady,
        isLoggedIn,
        login: logIn,
        updateLoginData,
        logout: logOut,
        loginData,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
