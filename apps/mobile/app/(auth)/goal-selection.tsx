import React, { useState } from "react";
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
import { Button } from "../../components";
import Theme from "../../constants/theme";
import type { Goal } from "@repo/schema";

const GOALS: {
  value: Goal;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { value: "Fluency", label: "Speak Fluently", icon: "chatbubbles" },
  { value: "Pronunciation", label: "Better Pronunciation", icon: "mic" },
  { value: "Vocabulary", label: "Expand Vocabulary", icon: "book" },
  { value: "Confidence", label: "Build Confidence", icon: "trophy" },
  { value: "Grammar", label: "Improve Grammar", icon: "construct" },
];

/**
 * Goal Selection Screen
 * Multi-select learning goals
 */
export default function GoalSelectionScreen() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);

  const toggleGoal = (goal: Goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      router.push("/(auth)/time-commitment");
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
        <Text style={styles.headerTitle}>Your Learning Goals</Text>
        <Text style={styles.headerSubtitle}>
          Select one or more (we recommend 2-3)
        </Text>
      </LinearGradient>

      {/* Goal Checkboxes */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {GOALS.map((goal) => {
          const isSelected = selectedGoals.includes(goal.value);
          return (
            <TouchableOpacity
              key={goal.value}
              style={[styles.goalItem, isSelected && styles.goalItemSelected]}
              onPress={() => toggleGoal(goal.value)}
            >
              <View style={styles.goalContent}>
                <View
                  style={[
                    styles.iconContainer,
                    isSelected && styles.iconContainerSelected,
                  ]}
                >
                  <Ionicons
                    name={goal.icon}
                    size={24}
                    color={
                      isSelected
                        ? Theme.colors.textInverse
                        : Theme.colors.primary
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.goalText,
                    isSelected && styles.goalTextSelected,
                  ]}
                >
                  {goal.label}
                </Text>
              </View>
              <View
                style={[styles.checkbox, isSelected && styles.checkboxSelected]}
              >
                {isSelected && (
                  <Ionicons
                    name="checkmark"
                    size={18}
                    color={Theme.colors.textInverse}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {selectedGoals.length} goal{selectedGoals.length !== 1 ? "s" : ""}{" "}
          selected
        </Text>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={selectedGoals.length === 0}
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
    gap: Theme.spacing.md,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Theme.spacing.base,
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: Theme.colors.border,
  },
  goalItemSelected: {
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.primaryLight,
  },
  goalContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerSelected: {
    backgroundColor: Theme.colors.primary,
  },
  goalText: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.textPrimary,
  },
  goalTextSelected: {
    color: Theme.colors.textInverse,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
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
