import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "../../components";
import Theme from "../../constants/theme";
import type { TimeCommitment } from "@repo/schema";

const TIME_OPTIONS: {
  value: TimeCommitment;
  label: string;
  subtitle: string;
}[] = [
  { value: "10", label: "10 minutes", subtitle: "Quick daily practice" },
  { value: "20", label: "20 minutes", subtitle: "Steady progress" },
  { value: "30", label: "30 minutes", subtitle: "Recommended" },
  { value: "45", label: "45 minutes", subtitle: "Intensive learning" },
];

/**
 * Time Commitment Screen
 * Select daily practice duration
 * Final onboarding screen
 */
export default function TimeCommitmentScreen() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState<TimeCommitment | null>(null);

  const handleComplete = () => {
    if (selectedTime) {
      // Onboarding complete - navigate to main app
      router.replace("/(tabs)/home");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={Theme.colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Daily Commitment</Text>
        <Text style={styles.headerSubtitle}>
          How much time can you dedicate daily?
        </Text>
      </LinearGradient>

      {/* Time Options */}
      <View style={styles.content}>
        {TIME_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.timeCard,
              selectedTime === option.value && styles.timeCardSelected,
            ]}
            onPress={() => setSelectedTime(option.value)}
          >
            <View style={styles.timeCardContent}>
              <Text
                style={[
                  styles.timeLabel,
                  selectedTime === option.value && styles.timeLabelSelected,
                ]}
              >
                {option.label}
              </Text>
              <Text
                style={[
                  styles.timeSubtitle,
                  selectedTime === option.value && styles.timeSubtitleSelected,
                ]}
              >
                {option.subtitle}
              </Text>
            </View>
            {option.value === "30" && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>RECOMMENDED</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Complete Button */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          You can always change this later in settings
        </Text>
        <Button
          title="Get Started"
          onPress={handleComplete}
          disabled={!selectedTime}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingTop: Theme.spacing["5xl"],
    paddingBottom: Theme.spacing["2xl"],
    paddingHorizontal: Theme.spacing.base,
  },
  headerTitle: {
    fontSize: Theme.typography.fontSize["2xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
    marginBottom: Theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textInverse,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: Theme.spacing.base,
    gap: Theme.spacing.md,
  },
  timeCard: {
    position: "relative",
    padding: Theme.spacing.xl,
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.borderRadius.xl,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    ...Theme.shadows.md,
  },
  timeCardSelected: {
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.primaryLight,
  },
  timeCardContent: {
    gap: Theme.spacing.xs,
  },
  timeLabel: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  timeLabelSelected: {
    color: Theme.colors.textInverse,
  },
  timeSubtitle: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  timeSubtitleSelected: {
    color: Theme.colors.textInverse,
    opacity: 0.9,
  },
  badge: {
    position: "absolute",
    top: Theme.spacing.md,
    right: Theme.spacing.md,
    backgroundColor: Theme.colors.warning,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  badgeText: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
  },
  footer: {
    paddingHorizontal: Theme.spacing.base,
    paddingBottom: Theme.spacing.xl,
    gap: Theme.spacing.sm,
  },
  footerText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
    textAlign: "center",
  },
});
