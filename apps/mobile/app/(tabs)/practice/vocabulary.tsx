import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../../components";
import Theme from "../../../constants/theme";
import { useDailyChallengeForUser } from "@repo/query";
import { ActivityIndicator } from "react-native";

export default function VocabularyScreen() {
  const { data: dailyChallenge, isLoading } = useDailyChallengeForUser();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  const vocabList = dailyChallenge?.vocabularies || [];

  if (vocabList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No vocabulary words available for today.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {vocabList.map((item) => {
          // Get the primary form display
          const displayForm =
            item.noun || item.verb || item.adjective || item.adverb;

          return (
            <Card key={item._id} style={styles.wordCard}>
              <View style={styles.wordHeader}>
                <Text style={styles.word}>{item.word}</Text>
              </View>
              <Text style={styles.definition}>{displayForm?.meaning}</Text>
              {displayForm?.example && (
                <View style={styles.exampleContainer}>
                  <Text style={styles.exampleLabel}>Example:</Text>
                  <Text style={styles.example}>{displayForm.example}</Text>
                </View>
              )}
              <View style={styles.footer}>
                <View
                  style={[
                    styles.difficultyBadge,
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
                  <Text style={styles.difficultyText}>{item.difficulty}</Text>
                </View>
                <TouchableOpacity style={styles.pronounceButton}>
                  <Ionicons
                    name="volume-high"
                    size={20}
                    color={Theme.colors.primary}
                  />
                  <Text style={styles.pronounceText}>Pronounce</Text>
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.backgroundSecondary },
  content: { padding: Theme.spacing.base },
  wordCard: { marginBottom: Theme.spacing.md },
  wordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.sm,
  },
  word: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  learnedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xs,
  },
  learnedText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.success,
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
  definition: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  exampleContainer: {
    backgroundColor: Theme.colors.backgroundTertiary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
  },
  exampleLabel: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  example: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textPrimary,
    fontStyle: "italic",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  difficultyBadge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  difficultyText: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
  },
  pronounceButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xs,
  },
  pronounceText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary,
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
