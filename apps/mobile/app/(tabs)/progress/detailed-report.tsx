import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "../../../components";
import Theme from "../../../constants/theme";
import { PROGRESS_DATA, SKILL_PROGRESS_DATA } from "../../../data/progress";

export default function DetailedReportScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Detailed Progress Report</Text>

        {/* Overall Stats */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Overall Statistics</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Speaking Minutes</Text>
            <Text style={styles.statValue}>
              {PROGRESS_DATA.totalSpeakingMinutes} min
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Words Learned</Text>
            <Text style={styles.statValue}>
              {PROGRESS_DATA.totalWordsLearned}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Current Streak</Text>
            <Text style={styles.statValue}>
              {PROGRESS_DATA.currentStreak} days
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Longest Streak</Text>
            <Text style={styles.statValue}>
              {PROGRESS_DATA.longestStreak} days
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Average Fluency Score</Text>
            <Text style={styles.statValue}>
              {PROGRESS_DATA.averageFluencyScore}/100
            </Text>
          </View>
        </Card>

        {/* Skills Breakdown */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Skills Breakdown</Text>
          {SKILL_PROGRESS_DATA.map((skill) => (
            <View key={skill.skill} style={styles.skillCard}>
              <Text style={styles.skillName}>{skill.skill}</Text>
              <View style={styles.skillDetails}>
                <View style={styles.skillBar}>
                  <View
                    style={[
                      styles.skillFill,
                      { width: `${skill.currentLevel}%` },
                    ]}
                  />
                </View>
                <Text style={styles.skillScore}>{skill.currentLevel}/100</Text>
              </View>
              <Text
                style={[
                  styles.trend,
                  {
                    color:
                      skill.trend === "up"
                        ? Theme.colors.success
                        : skill.trend === "down"
                          ? Theme.colors.error
                          : Theme.colors.textSecondary,
                  },
                ]}
              >
                {skill.trend === "up"
                  ? "↑ Improving"
                  : skill.trend === "down"
                    ? "↓ Needs Work"
                    : "→ Stable"}
              </Text>
            </View>
          ))}
        </Card>

        {/* Daily Activity Log */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Last 7 Days Activity</Text>
          {PROGRESS_DATA.activitiesByDate.map((activity, index) => (
            <View key={index} style={styles.activityRow}>
              <Text style={styles.activityDate}>
                {new Date(activity.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </Text>
              <View style={styles.activityStats}>
                <Text style={styles.activityStat}>
                  {activity.speakingMinutes} min speaking
                </Text>
                <Text style={styles.activityStat}>
                  {activity.wordsLearned} words
                </Text>
                <Text style={styles.activityStat}>
                  {activity.articlesRead} articles
                </Text>
              </View>
            </View>
          ))}
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.backgroundSecondary },
  content: { padding: Theme.spacing.base },
  title: {
    fontSize: Theme.typography.fontSize["2xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xl,
  },
  card: { marginBottom: Theme.spacing.md },
  cardTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    paddingBottom: Theme.spacing.sm,
  },
  statLabel: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textSecondary,
  },
  statValue: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  skillCard: { marginBottom: Theme.spacing.lg },
  skillName: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
  },
  skillDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.xs,
  },
  skillBar: {
    flex: 1,
    height: 8,
    backgroundColor: Theme.colors.backgroundTertiary,
    borderRadius: Theme.borderRadius.full,
    overflow: "hidden",
  },
  skillFill: {
    height: "100%",
    backgroundColor: Theme.colors.secondary,
    borderRadius: Theme.borderRadius.full,
  },
  skillScore: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    width: 48,
  },
  trend: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.md,
    paddingBottom: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  activityDate: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    width: 80,
  },
  activityStats: { flex: 1 },
  activityStat: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: 2,
  },
});
