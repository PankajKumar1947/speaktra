import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Card } from "../../../components";
import Theme from "../../../constants/theme";
import { READING_ARTICLES } from "../../../data/reading";

export default function ReadingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const article = READING_ARTICLES.find((a) => a.id === id);

  if (!article) {
    return (
      <View style={styles.container}>
        <Text>Article not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.category}>{article.category}</Text>
        <Text style={styles.title}>{article.title}</Text>

        {/* Key Vocabulary */}
        <Card style={styles.vocabCard}>
          <Text style={styles.vocabTitle}>Key Vocabulary</Text>
          <View style={styles.vocabList}>
            {article.keyVocabulary.map((word, index) => (
              <View key={index} style={styles.vocabChip}>
                <Text style={styles.vocabWord}>{word}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Content */}
        <Text style={styles.contentText}>{article.content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  content: { padding: Theme.spacing.base },
  category: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary,
    textTransform: "uppercase",
    fontWeight: Theme.typography.fontWeight.bold,
    marginBottom: Theme.spacing.xs,
  },
  title: {
    fontSize: Theme.typography.fontSize["2xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xl,
    lineHeight: Theme.typography.fontSize["2xl"] * 1.3,
  },
  vocabCard: { marginBottom: Theme.spacing.xl },
  vocabTitle: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  vocabList: { flexDirection: "row", flexWrap: "wrap", gap: Theme.spacing.sm },
  vocabChip: {
    backgroundColor: Theme.colors.primaryLight,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
  },
  vocabWord: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textInverse,
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
  contentText: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.textPrimary,
    lineHeight: Theme.typography.fontSize.base * 1.7,
  },
});
