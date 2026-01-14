import { Text, View } from "react-native";
import { User } from "@repo/schema";

export default function Index() {
  const user: User = {
    id: 1,
    name: "John Doe",
    age: 2,
    email: "john.doe@example.com",
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        {user.name} {user.email}
      </Text>
    </View>
  );
}
