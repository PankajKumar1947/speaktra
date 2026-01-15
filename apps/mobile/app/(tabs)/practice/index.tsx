import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../../components";
import Theme from "../../../constants/theme";

type ModuleRoute =
  | "/(tabs)/practice/vocabulary"
  | "/(tabs)/practice/sentences"
  | "/(tabs)/practice/reading-list";

const PRACTICE_MODULES = [
  {
    id: "vocabulary",
    title: "Vocabulary",
    description: "Learn domain-specific words",
    icon: "book" as const,
    route: "/(tabs)/practice/vocabulary",
    color: Theme.colors.primary,
    progress: 65,
  },
  {
    id: "sentences",
    title: "Sentence Practice",
    description: "Practice corporate sentences",
    icon: "chatbubbles" as const,
    route: "/(tabs)/practice/sentences",
    color: Theme.colors.secondary,
    progress: 40,
  },
  {
    id: "reading",
    title: "Reading",
    description: "Business articles & topics",
    icon: "newspaper" as const,
    route: "/(tabs)/practice/reading-list",
    color: Theme.colors.accent,
    progress: 33,
  },
];

/**
 * Practice Hub Screen
 * Main practice modules overview
 */
export default function PracticeHubScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Practice Modules</Text>
        <Text style={styles.subtitle}>
          Choose a module to improve your skills
        </Text>

        {PRACTICE_MODULES.map((module) => (
          <TouchableOpacity
            key={module.id}
            onPress={() => router.push(module.route as ModuleRoute)}
          >
            <Card style={styles.moduleCard}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: module.color },
                ]}
              >
                <Ionicons
                  name={module.icon}
                  size={32}
                  color={Theme.colors.textInverse}
                />
              </View>
              <View style={styles.moduleContent}>
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleDescription}>
                  {module.description}
                </Text>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${module.progress}%`,
                          backgroundColor: module.color,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>{module.progress}%</Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Theme.colors.textSecondary}
              />
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundSecondary,
  },
  content: {
    padding: Theme.spacing.base,
  },
  title: {
    fontSize: Theme.typography.fontSize["2xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xl,
  },
  moduleCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Theme.spacing.base,
    marginBottom: Theme.spacing.md,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: Theme.borderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Theme.spacing.md,
  },
  moduleContent: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  moduleDescription: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Theme.colors.backgroundTertiary,
    borderRadius: Theme.borderRadius.full,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: Theme.borderRadius.full,
  },
  progressText: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.textSecondary,
    width: 36,
  },
});
