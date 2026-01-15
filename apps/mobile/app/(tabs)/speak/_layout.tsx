import { Stack } from "expo-router";
import Theme from "../../../constants/theme";

export default function SpeakStack() {
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
      <Stack.Screen name="index" options={{ title: "Speak" }} />
      <Stack.Screen name="recording" options={{ title: "Recording" }} />
      <Stack.Screen name="feedback" options={{ title: "Feedback" }} />
    </Stack>
  );
}
