import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "../../../components";
import Theme from "../../../constants/theme";
import { AuthContext } from "@/contexts/auth-context";
import { useMe } from "@repo/query";
import { ActivityIndicator } from "react-native";

type ProfileRoute =
  | "/(tabs)/profile/preferences"
  | "/(tabs)/profile/subscription";

export default function ProfileScreen() {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { data: user, isLoading, isError } = useMe();

  const menuItems = [
    {
      id: "preferences",
      title: "Preferences",
      icon: "settings-outline" as const,
      route: "/(tabs)/profile/preferences",
    },
    {
      id: "subscription",
      title: "Subscription",
      icon: "card-outline" as const,
      route: "/(tabs)/profile/subscription",
    },
  ];

  const handleLogout = () => {
    authContext.logout();
    router.replace("/(auth)/login");
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (isError || !user) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Failed to load profile</Text>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/home")}
          style={styles.retryButton}
        >
          <Text style={styles.retryText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const domainName =
    typeof user.domain === "object" ? user.domain.name : user.domain;

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <LinearGradient
        colors={Theme.colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{user.name[0].toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Learning Profile */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Learning Profile</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Domain</Text>
            <Text style={styles.infoValue}>{domainName || "Not set"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Level</Text>
            <Text style={styles.infoValue}>{user.level || "Not set"}</Text>
          </View>
          <View style={styles.goalsContainer}>
            <Text style={styles.infoLabel}>Goals</Text>
            <View style={styles.goalsChips}>
              {user.goals?.map((goal: string, index: number) => (
                <View key={index} style={styles.goalChip}>
                  <Text style={styles.goalText}>{goal}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>

        {/* Menu Items */}
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(item.route as ProfileRoute)}
          >
            <Card style={styles.menuCard}>
              <View style={styles.menuContent}>
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={Theme.colors.primary}
                />
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Theme.colors.textSecondary}
              />
            </Card>
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout}>
          <Card style={styles.logoutCard}>
            <View style={styles.menuContent}>
              <Ionicons
                name="log-out-outline"
                size={24}
                color={Theme.colors.error}
              />
              <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.backgroundSecondary },
  header: { padding: Theme.spacing["3xl"], alignItems: "center" },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Theme.colors.textInverse,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.lg,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary,
  },
  name: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
    marginBottom: Theme.spacing.xs,
  },
  email: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textInverse,
    opacity: 0.9,
  },
  content: { padding: Theme.spacing.base },
  card: { marginBottom: Theme.spacing.md },
  cardTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  infoLabel: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textSecondary,
  },
  infoValue: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.textPrimary,
  },
  goalsContainer: { marginBottom: Theme.spacing.sm },
  goalsChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Theme.spacing.sm,
    marginTop: Theme.spacing.sm,
  },
  goalChip: {
    backgroundColor: Theme.colors.primaryLight,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
  },
  goalText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textInverse,
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
  menuCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.sm,
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.md,
  },
  menuText: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.textPrimary,
  },
  logoutCard: { borderColor: Theme.colors.error, borderWidth: 1 },
  logoutText: { color: Theme.colors.error },
  center: { justifyContent: "center", alignItems: "center" },
  errorText: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.error,
    marginBottom: Theme.spacing.md,
  },
  retryButton: {
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.lg,
  },
  retryText: {
    color: Theme.colors.textInverse,
    fontWeight: Theme.typography.fontWeight.bold,
  },
});
