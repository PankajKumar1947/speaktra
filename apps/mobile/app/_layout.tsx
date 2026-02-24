import { ReactQueryProvider } from "@repo/query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ReactQueryProvider>
        <StatusBar style="auto" translucent={false} />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ReactQueryProvider>
    </SafeAreaProvider>
  );
}
