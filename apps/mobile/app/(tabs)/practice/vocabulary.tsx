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
import { VOCABULARY_WORDS } from "../../../data/vocabulary";

export default function VocabularyScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {VOCABULARY_WORDS.map((word) => (
          <Card key={word.id} style={styles.wordCard}>
            <View style={styles.wordHeader}>
              <Text style={styles.word}>{word.word}</Text>
              {word.learned && (
                <View style={styles.learnedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={Theme.colors.success}
                  />
                  <Text style={styles.learnedText}>Learned</Text>
                </View>
              )}
            </View>
            <Text style={styles.definition}>{word.definition}</Text>
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleLabel}>Example:</Text>
              <Text style={styles.example}>{word.example}</Text>
            </View>
            <View style={styles.footer}>
              <View
                style={[
                  styles.difficultyBadge,
                  {
                    backgroundColor:
                      word.difficulty === "Easy"
                        ? Theme.colors.success
                        : word.difficulty === "Medium"
                          ? Theme.colors.warning
                          : Theme.colors.error,
                  },
                ]}
              >
                <Text style={styles.difficultyText}>{word.difficulty}</Text>
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
        ))}
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
});
