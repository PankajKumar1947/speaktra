import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Button } from "../../../components";
import Theme from "../../../constants/theme";
import { DUMMY_FEEDBACK } from "../../../data/speaking";

export default function SpeakingFeedbackScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Score Header */}
      <LinearGradient
        colors={Theme.colors.gradientSecondary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Great Job!</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreValue}>{DUMMY_FEEDBACK.overallScore}</Text>
          <Text style={styles.scoreLabel}>Overall Score</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Scores Breakdown */}
        <Card style={styles.scoresCard}>
          <Text style={styles.sectionTitle}>Scores Breakdown</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Fluency</Text>
            <View style={styles.scoreBarContainer}>
              <View style={styles.scoreBar}>
                <View
                  style={[
                    styles.scoreBarFill,
                    { width: `${DUMMY_FEEDBACK.fluencyScore}%` },
                  ]}
                />
              </View>
              <Text style={styles.scoreText}>
                {DUMMY_FEEDBACK.fluencyScore}
              </Text>
            </View>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Pronunciation</Text>
            <View style={styles.scoreBarContainer}>
              <View style={styles.scoreBar}>
                <View
                  style={[
                    styles.scoreBarFill,
                    { width: `${DUMMY_FEEDBACK.pronunciationScore}%` },
                  ]}
                />
              </View>
              <Text style={styles.scoreText}>
                {DUMMY_FEEDBACK.pronunciationScore}
              </Text>
            </View>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Grammar</Text>
            <View style={styles.scoreBarContainer}>
              <View style={styles.scoreBar}>
                <View
                  style={[
                    styles.scoreBarFill,
                    { width: `${DUMMY_FEEDBACK.grammarScore}%` },
                  ]}
                />
              </View>
              <Text style={styles.scoreText}>
                {DUMMY_FEEDBACK.grammarScore}
              </Text>
            </View>
          </View>
        </Card>

        {/* Strengths */}
        <Card style={styles.feedbackCard}>
          <View style={styles.feedbackHeader}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={Theme.colors.success}
            />
            <Text style={styles.feedbackTitle}>Strengths</Text>
          </View>
          {DUMMY_FEEDBACK.strengths.map((item, index) => (
            <Text key={index} style={styles.feedbackItem}>
              • {item}
            </Text>
          ))}
        </Card>

        {/* Suggestions */}
        <Card style={styles.feedbackCard}>
          <View style={styles.feedbackHeader}>
            <Ionicons name="bulb" size={24} color={Theme.colors.warning} />
            <Text style={styles.feedbackTitle}>Suggestions</Text>
          </View>
          {DUMMY_FEEDBACK.suggestions.map((item, index) => (
            <Text key={index} style={styles.feedbackItem}>
              • {item}
            </Text>
          ))}
        </Card>

        {/* Areas to Improve */}
        <Card style={styles.feedbackCard}>
          <View style={styles.feedbackHeader}>
            <Ionicons
              name="trending-up"
              size={24}
              color={Theme.colors.primary}
            />
            <Text style={styles.feedbackTitle}>Areas to Improve</Text>
          </View>
          {DUMMY_FEEDBACK.areasToImprove.map((item, index) => (
            <Text key={index} style={styles.feedbackItem}>
              • {item}
            </Text>
          ))}
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Try Again"
            onPress={() => router.back()}
            variant="secondary"
            style={styles.button}
          />
          <Button
            title="Done"
            onPress={() => router.push("/(tabs)/home")}
            style={styles.button}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.backgroundSecondary },
  header: { padding: Theme.spacing["3xl"], alignItems: "center" },
  headerTitle: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
    marginBottom: Theme.spacing.lg,
  },
  scoreContainer: { alignItems: "center" },
  scoreValue: {
    fontSize: 72,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
  },
  scoreLabel: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textInverse,
    opacity: 0.9,
  },
  content: { padding: Theme.spacing.base },
  scoresCard: { marginBottom: Theme.spacing.md },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  scoreRow: { marginBottom: Theme.spacing.md },
  scoreBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
  },
  scoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: Theme.colors.backgroundTertiary,
    borderRadius: Theme.borderRadius.full,
    overflow: "hidden",
  },
  scoreBarFill: {
    height: "100%",
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.full,
  },
  scoreText: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    width: 32,
  },
  feedbackCard: { marginBottom: Theme.spacing.md },
  feedbackHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  feedbackTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  feedbackItem: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
    lineHeight: Theme.typography.fontSize.sm * 1.5,
  },
  actions: {
    flexDirection: "row",
    gap: Theme.spacing.md,
    marginVertical: Theme.spacing.xl,
  },
  button: { flex: 1 },
});
