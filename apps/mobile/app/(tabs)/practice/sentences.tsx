import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "../../../components";
import Theme from "../../../constants/theme";

import { useDailyChallengeForUser } from "@repo/query";
import { ActivityIndicator } from "react-native";

export default function SentencePracticeScreen() {
  const { data: dailyChallenge, isLoading } = useDailyChallengeForUser();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  const sentenceList = dailyChallenge?.sentences || [];

  if (sentenceList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No sentences available for today.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {sentenceList.map((item) => (
          <Card key={item?._id} style={styles.sentenceCard}>
            <Text style={styles.sentence}>{item.sentence}</Text>
            <Text style={styles.context}>Context: {item.context}</Text>
            <View style={styles.footer}>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      item.difficulty === "easy"
                        ? Theme.colors.success
                        : item.difficulty === "medium"
                          ? Theme.colors.warning
                          : Theme.colors.error,
                  },
                ]}
              >
                <Text style={styles.badgeText}>{item.difficulty}</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.backgroundSecondary },
  content: { padding: Theme.spacing.base },
  sentenceCard: { marginBottom: Theme.spacing.md },
  sentence: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
    lineHeight: Theme.typography.fontSize.lg * 1.5,
  },
  context: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  badgeText: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
  },
  completed: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.success,
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing.xl,
  },
  emptyText: {
    textAlign: "center",
    color: Theme.colors.textSecondary,
    fontSize: Theme.typography.fontSize.base,
  },
});
