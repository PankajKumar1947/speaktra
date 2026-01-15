import { Stack } from "expo-router";
import Theme from "../../../constants/theme";

export default function ProgressStack() {
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
      <Stack.Screen name="index" options={{ title: "Progress" }} />
      <Stack.Screen
        name="detailed-report"
        options={{ title: "Detailed Report" }}
      />
    </Stack>
  );
}
