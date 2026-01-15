import { Stack } from "expo-router";
import Theme from "../../../constants/theme";

export default function PracticeStack() {
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
      <Stack.Screen name="index" options={{ title: "Practice Hub" }} />
      <Stack.Screen name="vocabulary" options={{ title: "Vocabulary" }} />
      <Stack.Screen name="sentences" options={{ title: "Sentence Practice" }} />
      <Stack.Screen name="reading-list" options={{ title: "Reading" }} />
      <Stack.Screen
        name="reading-detail"
        options={{ title: "Reading Detail" }}
      />
    </Stack>
  );
}
