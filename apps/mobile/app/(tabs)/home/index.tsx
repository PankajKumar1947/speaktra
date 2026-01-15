import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Button } from "../../../components";
import Theme from "../../../constants/theme";
import { DUMMY_USER } from "../../../data/user";
import { PROGRESS_DATA } from "../../../data/progress";

/**
 * Home Screen
 * Daily plan, quick stats, and CTA to start speaking
 */
export default function HomeScreen() {
  const router = useRouter();

  const todayActivity = PROGRESS_DATA.activitiesByDate[0];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={Theme.colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good day,</Text>
            <Text style={styles.userName}>{DUMMY_USER.name}!</Text>
          </View>
          <View style={styles.streakContainer}>
            <Ionicons name="flame" size={24} color={Theme.colors.warning} />
            <Text style={styles.streakText}>
              {PROGRESS_DATA.currentStreak} day streak
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Ionicons name="timer" size={24} color={Theme.colors.primary} />
          <Text style={styles.statValue}>{todayActivity.speakingMinutes}</Text>
          <Text style={styles.statLabel}>Minutes Today</Text>
        </Card>
        <Card style={styles.statCard}>
          <Ionicons name="book" size={24} color={Theme.colors.secondary} />
          <Text style={styles.statValue}>{todayActivity.wordsLearned}</Text>
          <Text style={styles.statLabel}>Words Learned</Text>
        </Card>
      </View>

      {/* Main CTA */}
      <Card style={styles.ctaCard}>
        <LinearGradient
          colors={Theme.colors.gradientSecondary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaGradient}
        >
          <Ionicons name="mic" size={48} color={Theme.colors.textInverse} />
          <Text style={styles.ctaTitle}>Ready to Practice Speaking?</Text>
          <Text style={styles.ctaSubtitle}>
            Start a session and improve your fluency
          </Text>
          <Button
            title="Start Speaking"
            onPress={() => router.push("/(tabs)/speak")}
            style={styles.ctaButton}
          />
        </LinearGradient>
      </Card>

      {/* Today's Plan */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Plan</Text>
        <Card style={styles.taskCard}>
          <View style={styles.task}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={Theme.colors.success}
            />
            <Text style={styles.taskText}>
              Complete 30 min speaking practice
            </Text>
          </View>
        </Card>
        <Card style={styles.taskCard}>
          <View style={styles.task}>
            <Ionicons
              name="ellipse-outline"
              size={24}
              color={Theme.colors.textSecondary}
            />
            <Text style={styles.taskText}>Learn 10 new vocabulary words</Text>
          </View>
        </Card>
        <Card style={styles.taskCard}>
          <View style={styles.task}>
            <Ionicons
              name="ellipse-outline"
              size={24}
              color={Theme.colors.textSecondary}
            />
            <Text style={styles.taskText}>Read 1 business article</Text>
          </View>
        </Card>
      </View>

      {/* Motivation Quote */}
      <Card style={styles.quoteCard}>
        <Ionicons
          name="chatbox-ellipses"
          size={24}
          color={Theme.colors.primary}
        />
        <Text style={styles.quoteText}>
          "The only way to learn a language is to practice speaking it as often
          as possible."
        </Text>
        <Text style={styles.quoteAuthor}>— Unknown</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundSecondary,
  },
  header: {
    paddingTop: Theme.spacing["5xl"],
    paddingBottom: Theme.spacing["2xl"],
    paddingHorizontal: Theme.spacing.base,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textInverse,
    opacity: 0.9,
  },
  userName: {
    fontSize: Theme.typography.fontSize["2xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xs,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
  },
  streakText: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.textInverse,
  },
  statsContainer: {
    flexDirection: "row",
    gap: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.base,
    marginTop: -Theme.spacing.xl,
    marginBottom: Theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: Theme.spacing.base,
  },
  statValue: {
    fontSize: Theme.typography.fontSize["2xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginTop: Theme.spacing.sm,
  },
  statLabel: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.xs,
  },
  ctaCard: {
    marginHorizontal: Theme.spacing.base,
    marginBottom: Theme.spacing.lg,
    padding: 0,
    overflow: "hidden",
  },
  ctaGradient: {
    padding: Theme.spacing.xl,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
    marginTop: Theme.spacing.md,
    textAlign: "center",
  },
  ctaSubtitle: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textInverse,
    opacity: 0.9,
    marginTop: Theme.spacing.xs,
    textAlign: "center",
  },
  ctaButton: {
    marginTop: Theme.spacing.lg,
    backgroundColor: Theme.colors.textInverse,
  },
  section: {
    paddingHorizontal: Theme.spacing.base,
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  taskCard: {
    marginBottom: Theme.spacing.sm,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.md,
  },
  taskText: {
    flex: 1,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textPrimary,
  },
  quoteCard: {
    marginHorizontal: Theme.spacing.base,
    marginBottom: Theme.spacing.xl,
    padding: Theme.spacing.lg,
  },
  quoteText: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textPrimary,
    fontStyle: "italic",
    marginTop: Theme.spacing.md,
    lineHeight:
      Theme.typography.fontSize.base * Theme.typography.lineHeight.relaxed,
  },
  quoteAuthor: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.sm,
    textAlign: "right",
  },
});
