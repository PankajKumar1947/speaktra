import { LoginData } from "@repo/schema";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setAccessToken,
  setRefreshToken,
  setOnTokenRefresh,
  getMe,
} from "@repo/api-client";
import Toast from "react-native-toast-message";

type AuthState = {
  isLoggedIn: boolean;
  login: (data: LoginData) => void;
  updateLoginData: (data: Partial<LoginData>) => void;
  logout: () => void;
  isReady: boolean;
  loginData: LoginData | null;
};

const authStorageKey = "auth-key";

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  login: () => {},
  updateLoginData: () => {},
  logout: () => {},
  isReady: false,
  loginData: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const [isReady, setIsReady] = useState(false);

  const isLoggedIn = !!loginData;

  // store the authToken in async storage
  const storeAuthState = async (data: LoginData) => {
    try {
      setAccessToken(data?.accessToken);
      setRefreshToken(data?.refreshToken);
      await AsyncStorage.setItem(authStorageKey, JSON.stringify(data));
    } catch (error) {
      console.error("Error storing auth state:", error);
    }
    setIsReady(true);
  };

  const logIn = async (data: LoginData) => {
    setLoginData(data);
    await storeAuthState(data);
    if (data?.onboardingCompleted) {
      router.replace("/(tabs)/home");
    } else {
      router.replace("/(auth)/domain-selection");
    }
  };

  const updateLoginData = async (data: Partial<LoginData>) => {
    if (loginData) {
      const updatedData = { ...loginData, ...data };
      setLoginData(updatedData);
      await storeAuthState(updatedData);
    }
  };

  const logOut = () => {
    setLoginData(null);
    AsyncStorage.removeItem(authStorageKey); // Clear from storage too
    router.replace("/(auth)/login");
  };

  // fetching the auth state from async storage
  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const authData = await AsyncStorage.getItem(authStorageKey);

        if (authData) {
          const data = JSON.parse(authData);
          setLoginData(data);
          setAccessToken(data?.accessToken);
          setRefreshToken(data?.refreshToken);

          // verify the token from the server
          try {
            await getMe();
          } catch (error) {
            console.error("Session verification failed:", error);
            Toast.show({
              type: "error",
              text1: "Your session has expired",
              text2: "Please login again",
            });
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
