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
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "../../../components";
import Theme from "../../../constants/theme";
import { PROGRESS_DATA, SKILL_PROGRESS_DATA } from "../../../data/progress";

export default function ProgressDashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header Stats */}
      <LinearGradient
        colors={Theme.colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Your Progress</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {PROGRESS_DATA.totalSpeakingMinutes}
            </Text>
            <Text style={styles.statLabel}>Total Minutes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {PROGRESS_DATA.totalWordsLearned}
            </Text>
            <Text style={styles.statLabel}>Words Learned</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{PROGRESS_DATA.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Weekly Progress */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Weekly Goal</Text>
            <Text style={styles.percentage}>
              {PROGRESS_DATA.weeklyGoalProgress}%
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${PROGRESS_DATA.weeklyGoalProgress}%` },
              ]}
            />
          </View>
        </Card>

        {/* Skills Progress */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Skills Progress</Text>
          {SKILL_PROGRESS_DATA.map((skill) => (
            <View key={skill.skill} style={styles.skillRow}>
              <View style={styles.skillInfo}>
                <Text style={styles.skillName}>{skill.skill}</Text>
                <Ionicons
                  name={
                    skill.trend === "up"
                      ? "trending-up"
                      : skill.trend === "down"
                        ? "trending-down"
                        : "remove"
                  }
                  size={16}
                  color={
                    skill.trend === "up"
                      ? Theme.colors.success
                      : skill.trend === "down"
                        ? Theme.colors.error
                        : Theme.colors.textSecondary
                  }
                />
              </View>
              <View style={styles.skillProgress}>
                <View style={styles.skillBar}>
                  <View
                    style={[
                      styles.skillFill,
                      { width: `${skill.currentLevel}%` },
                    ]}
                  />
                </View>
                <Text style={styles.skillValue}>{skill.currentLevel}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Activity Chart Placeholder */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Last 7 Days Activity</Text>
          <View style={styles.chartPlaceholder}>
            {PROGRESS_DATA.activitiesByDate.map((activity, index) => {
              const maxMinutes = Math.max(
                ...PROGRESS_DATA.activitiesByDate.map((a) => a.speakingMinutes),
              );
              const heightPercentage =
                (activity.speakingMinutes / maxMinutes) * 100;

              return (
                <View key={index} style={styles.barContainer}>
                  <View
                    style={[styles.bar, { height: `${heightPercentage}%` }]}
                  />
                  <Text style={styles.barLabel}>
                    {new Date(activity.date).getDate()}
                  </Text>
                </View>
              );
            })}
          </View>
        </Card>

        {/* View Detailed Report */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/progress/detailed-report")}
        >
          <Card style={styles.detailedCard}>
            <Text style={styles.detailedText}>View Detailed Report</Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={Theme.colors.primary}
            />
          </Card>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.backgroundSecondary },
  header: { padding: Theme.spacing["2xl"] },
  headerTitle: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
    marginBottom: Theme.spacing.lg,
    textAlign: "center",
  },
  statsGrid: { flexDirection: "row", justifyContent: "space-around" },
  statItem: { alignItems: "center" },
  statValue: {
    fontSize: Theme.typography.fontSize["2xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
  },
  statLabel: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.textInverse,
    opacity: 0.9,
    marginTop: Theme.spacing.xs,
  },
  content: { padding: Theme.spacing.base },
  card: { marginBottom: Theme.spacing.md },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  cardTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  percentage: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary,
  },
  progressBar: {
    height: 12,
    backgroundColor: Theme.colors.backgroundTertiary,
    borderRadius: Theme.borderRadius.full,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.full,
  },
  skillRow: { marginBottom: Theme.spacing.md },
  skillInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.xs,
  },
  skillName: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.textPrimary,
  },
  skillProgress: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
  },
  skillBar: {
    flex: 1,
    height: 6,
    backgroundColor: Theme.colors.backgroundTertiary,
    borderRadius: Theme.borderRadius.full,
    overflow: "hidden",
  },
  skillFill: {
    height: "100%",
    backgroundColor: Theme.colors.secondary,
    borderRadius: Theme.borderRadius.full,
  },
  skillValue: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    width: 28,
  },
  chartPlaceholder: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 150,
    marginTop: Theme.spacing.md,
  },
  barContainer: { alignItems: "center", flex: 1 },
  bar: {
    width: 24,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.sm,
  },
  barLabel: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.xs,
  },
  detailedCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailedText: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.primary,
  },
});
