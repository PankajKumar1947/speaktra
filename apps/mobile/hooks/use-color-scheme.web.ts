import { useColorScheme as useRNColorScheme } from "react-native";

/**
 * For web platform, we can directly use the native color scheme hook
 * as it's compatible with SSR in expo-router
 */
export function useColorScheme() {
  return useRNColorScheme();
}
