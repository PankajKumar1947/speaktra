import { Stack } from "expo-router";
import Theme from "../../../constants/theme";

export default function ProfileStack() {
  return (
    <Stack
      screenOptions={{
        statusBarTranslucent: false,
        headerStyle: {
          backgroundColor: Theme.colors.background,
        },
        headerTintColor: Theme.colors.textPrimary,
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen name="preferences" options={{ title: "Preferences" }} />
      <Stack.Screen name="subscription" options={{ title: "Subscription" }} />
    </Stack>
  );
}
