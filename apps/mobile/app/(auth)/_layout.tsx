import { Stack } from "expo-router";

/**
 * Auth Flow Stack Navigator
 * Handles onboarding and authentication screens
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="domain-selection" />
      <Stack.Screen name="level-selection" />
      <Stack.Screen name="goal-selection" />
      <Stack.Screen name="time-commitment" />
    </Stack>
  );
}
