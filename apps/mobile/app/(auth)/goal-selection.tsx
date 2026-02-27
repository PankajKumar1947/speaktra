import React, { useState } from "react";
import { AuthContext } from "@/contexts/auth-context";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "../../components";
import Theme from "../../constants/theme";
import { Goal, userGoals, Level } from "@repo/schema";
import { useCompleteOnboarding } from "@repo/query";
import Toast from "react-native-toast-message";

export default function GoalSelectionScreen() {
  const router = useRouter();
  const { domain, level } = useLocalSearchParams<{
    domain: string;
    level: Level;
  }>();
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);
  const { mutate: completeOnboarding, isPending } = useCompleteOnboarding();

  const toggleGoal = (goal: Goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const authContext = React.useContext(AuthContext);

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      completeOnboarding(
        {
          domain,
          level,
          goals: selectedGoals as Goal[],
        },
        {
          onSuccess: () => {
            Toast.show({
              type: "success",
              text1: "Goals selected successfully",
            });
            authContext.updateLoginData({ onboardingCompleted: true });
            router.replace("/(tabs)/home");
          },
          onError: (error) => {
            Toast.show({
              type: "error",
              text1: "Failed to select goals",
              text2: error.message,
            });
          },
        },
      );
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
        {userGoals.map((goal) => {
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
                    name={goal.icon as keyof typeof Ionicons.glyphMap}
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
          loading={isPending}
          title="Continue"
          onPress={handleContinue}
          disabled={selectedGoals.length === 0 || isPending}
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
