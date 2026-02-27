import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "../../components";
import Theme from "../../constants/theme";
import { Level, userLevels } from "@repo/schema";

export default function LevelSelectionScreen() {
  const router = useRouter();
  const { domain } = useLocalSearchParams<{ domain: string }>();
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  const handleContinue = () => {
    if (selectedLevel) {
      router.push({
        pathname: "/(auth)/goal-selection",
        params: { domain, level: selectedLevel },
      });
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
        <Text style={styles.headerTitle}>Your Current Level</Text>
        <Text style={styles.headerSubtitle}>
          Help us understand where you are
        </Text>
      </LinearGradient>

      {/* Level Cards */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {userLevels.map((level) => (
          <TouchableOpacity
            key={level.value}
            style={[
              styles.card,
              selectedLevel === level.value && styles.cardSelected,
            ]}
            onPress={() => setSelectedLevel(level.value)}
          >
            <Text
              style={[
                styles.cardTitle,
                selectedLevel === level.value && styles.cardTitleSelected,
              ]}
            >
              {level.label}
            </Text>
            <Text
              style={[
                styles.cardDescription,
                selectedLevel === level.value && styles.cardDescriptionSelected,
              ]}
            >
              {level.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedLevel}
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
  scrollContent: {
    padding: Theme.spacing.base,
    gap: Theme.spacing.base,
  },
  card: {
    padding: Theme.spacing.xl,
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.borderRadius.xl,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    ...Theme.shadows.md,
  },
  cardSelected: {
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.primaryLight,
  },
  cardTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  cardTitleSelected: {
    color: Theme.colors.textInverse,
  },
  cardDescription: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  cardDescriptionSelected: {
    color: Theme.colors.textInverse,
    opacity: 0.9,
  },
  footer: {
    paddingHorizontal: Theme.spacing.base,
    paddingBottom: Theme.spacing.xl,
  },
});
