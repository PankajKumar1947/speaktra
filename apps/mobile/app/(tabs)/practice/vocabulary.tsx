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
import { useDailyChallengeVocabularies } from "@repo/query";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function VocabularyScreen() {
  const { dailyChallengeId } = useLocalSearchParams<{
    dailyChallengeId: string;
  }>();
  const { data: vocabList, isLoading } = useDailyChallengeVocabularies(
    dailyChallengeId!,
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (vocabList?.length === 0) {
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
        {vocabList?.map((item) => {
          const forms = [
            { type: "noun", data: item.noun },
            { type: "verb", data: item.verb },
            { type: "adjective", data: item.adjective },
            { type: "adverb", data: item.adverb },
          ].filter((f) => f.data);

          return (
            <Card key={item._id} style={styles.wordCard}>
              <View style={styles.wordHeader}>
                <View style={styles.wordTitleContainer}>
                  <Ionicons
                    name="book"
                    size={24}
                    color={Theme.colors.primary}
                  />
                  <Text style={styles.word}>{item.word}</Text>
                </View>
              </View>

              {forms.map((form, index) => (
                <View
                  key={form.type}
                  style={[
                    styles.formContainer,
                    index > 0 && styles.formDivider,
                  ]}
                >
                  <View style={styles.formHeader}>
                    <Text style={styles.formType}>{form.type}</Text>
                  </View>

                  <View style={styles.meaningContainer}>
                    <Ionicons
                      name="text"
                      size={16}
                      color={Theme.colors.textSecondary}
                      style={styles.contentIcon}
                    />
                    <Text style={styles.definition}>{form.data!.meaning}</Text>
                  </View>

                  {form.data!.example && (
                    <View style={styles.exampleContainer}>
                      <View style={styles.exampleHeader}>
                        <Ionicons
                          name="chatbubble-ellipses-outline"
                          size={16}
                          color={Theme.colors.primary}
                        />
                        <Text style={styles.exampleLabel}>Example</Text>
                      </View>
                      <Text style={styles.example}>{form.data!.example}</Text>
                    </View>
                  )}
                </View>
              ))}
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
    marginBottom: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderLight,
  },
  wordTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.sm,
  },
  word: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    letterSpacing: -0.5,
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
  formContainer: {
    marginBottom: Theme.spacing.md,
  },
  formDivider: {
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderLight,
    paddingTop: Theme.spacing.lg,
    marginTop: Theme.spacing.sm,
  },
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.sm,
  },
  formType: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    backgroundColor: Theme.colors.backgroundTertiary,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  meaningContainer: {
    flexDirection: "row",
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  contentIcon: {
    marginTop: 2,
  },
  definition: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textPrimary,
    flex: 1,
    lineHeight: 22,
  },
  exampleContainer: {
    backgroundColor: Theme.colors.backgroundSecondary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    borderLeftWidth: 3,
    borderLeftColor: Theme.colors.primaryLight,
  },
  exampleHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xs,
    marginBottom: Theme.spacing.xs,
  },
  exampleLabel: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textSecondary,
    textTransform: "uppercase",
  },
  example: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textSecondary,
    fontStyle: "italic",
    lineHeight: 22,
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
