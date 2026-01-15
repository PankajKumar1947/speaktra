import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import { Card } from "../../../components";
import Theme from "../../../constants/theme";

export default function PreferencesScreen() {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Notifications */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Notifications</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{
                false: Theme.colors.border,
                true: Theme.colors.primaryLight,
              }}
              thumbColor={
                notifications
                  ? Theme.colors.primary
                  : Theme.colors.backgroundTertiary
              }
            />
          </View>
          <Text style={styles.settingDescription}>
            Receive daily reminders and progress updates
          </Text>
        </Card>

        {/* Audio */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Audio Settings</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Sound Effects</Text>
            <Switch
              value={soundEffects}
              onValueChange={setSoundEffects}
              trackColor={{
                false: Theme.colors.border,
                true: Theme.colors.primaryLight,
              }}
              thumbColor={
                soundEffects
                  ? Theme.colors.primary
                  : Theme.colors.backgroundTertiary
              }
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Auto-play Audio</Text>
            <Switch
              value={autoPlay}
              onValueChange={setAutoPlay}
              trackColor={{
                false: Theme.colors.border,
                true: Theme.colors.primaryLight,
              }}
              thumbColor={
                autoPlay
                  ? Theme.colors.primary
                  : Theme.colors.backgroundTertiary
              }
            />
          </View>
          <Text style={styles.settingDescription}>
            Automatically play pronunciation examples
          </Text>
        </Card>

        {/* Appearance */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Appearance</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{
                false: Theme.colors.border,
                true: Theme.colors.primaryLight,
              }}
              thumbColor={
                darkMode
                  ? Theme.colors.primary
                  : Theme.colors.backgroundTertiary
              }
            />
          </View>
          <Text style={styles.settingDescription}>
            Switch between light and dark theme
          </Text>
        </Card>

        {/* About */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>App Name</Text>
            <Text style={styles.infoValue}>Speaktra</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.backgroundSecondary },
  content: { padding: Theme.spacing.base },
  card: { marginBottom: Theme.spacing.md },
  cardTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  settingLabel: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textPrimary,
  },
  settingDescription: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginTop: -Theme.spacing.sm,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.sm,
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
});
