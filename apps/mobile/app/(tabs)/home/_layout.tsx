import { Stack } from "expo-router";
import Theme from "../../../constants/theme";

export default function HomeStack() {
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
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
