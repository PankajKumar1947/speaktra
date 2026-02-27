import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import * as Haptics from "expo-haptics";
import Theme from "../../../constants/theme";
import { useArticle } from "@repo/query";

export default function ReadingDetailScreen() {
  const { articleId } = useLocalSearchParams<{ articleId: string }>();
  const router = useRouter();
  const { data: article, isLoading } = useArticle(articleId!);

  const handleComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Article not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>{article.title}</Text>

        <View style={styles.difficultyContainer}>
          <View
            style={[
              styles.difficultyBadge,
              {
                backgroundColor:
                  article.difficulty === "easy"
                    ? Theme.colors.success + "15"
                    : article.difficulty === "medium"
                      ? Theme.colors.warning + "15"
                      : Theme.colors.error + "15",
              },
            ]}
          >
            <View
              style={[
                styles.difficultyDot,
                {
                  backgroundColor:
                    article.difficulty === "easy"
                      ? Theme.colors.success
                      : article.difficulty === "medium"
                        ? Theme.colors.warning
                        : Theme.colors.error,
                },
              ]}
            />
            <Text
              style={[
                styles.difficultyText,
                {
                  color:
                    article.difficulty === "easy"
                      ? Theme.colors.success
                      : article.difficulty === "medium"
                        ? Theme.colors.warning
                        : Theme.colors.error,
                },
              ]}
            >
              {article.difficulty}
            </Text>
          </View>
          <View style={styles.metaInfo}>
            <Ionicons
              name="time-outline"
              size={14}
              color={Theme.colors.textTertiary}
            />
            <Text style={styles.metaText}>{article.minRead} min read</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Markdown style={markdownStyles}>{article.description}</Markdown>
        </View>

        {/* Keywords / Vocabulary */}
        {article.keywords && article.keywords.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconBox}>
                <Ionicons
                  name="sparkles"
                  size={18}
                  color={Theme.colors.primary}
                />
              </View>
              <Text style={styles.sectionTitle}>Key Takeaways</Text>
            </View>
            <View style={styles.keywordsList}>
              {article.keywords.map((word, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.keywordChip}
                  activeOpacity={0.6}
                  onPress={() =>
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  }
                >
                  <Text style={styles.keywordText}>{word}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleComplete}
          activeOpacity={0.8}
        >
          <Text style={styles.completeButtonText}>Mark as Completed</Text>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={Theme.colors.textInverse}
          />
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const markdownStyles = {
  body: {
    fontSize: 16,
    color: Theme.colors.textPrimary,
    lineHeight: 26,
    fontFamily: Platform.OS === "ios" ? "System" : "normal",
  },
  heading1: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Theme.colors.textPrimary,
    marginTop: 24,
    marginBottom: 12,
  },
  heading2: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Theme.colors.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 16,
  },
  strong: {
    fontWeight: "700" as const,
    color: Theme.colors.textPrimary,
  },
  em: {
    fontStyle: "italic" as const,
  },
  bullet_list: {
    marginBottom: 16,
  },
  list_item: {
    flexDirection: "row" as const,
    alignItems: "flex-start" as const,
    marginBottom: 8,
  },
  bullet_list_icon: {
    color: Theme.colors.primary,
    fontSize: 20,
    lineHeight: 26,
    marginRight: 8,
  },
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Theme.colors.textPrimary,
    marginBottom: 12,
    lineHeight: 36,
  },
  difficultyContainer: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  difficultyBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    gap: 8,
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: Theme.colors.textTertiary,
    fontWeight: "500",
  },
  contentSection: {
    backgroundColor: Theme.colors.backgroundSecondary + "30",
    borderRadius: 12,
    marginBottom: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Theme.colors.primary + "10",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Theme.colors.textPrimary,
  },
  keywordsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  keywordChip: {
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Theme.colors.backgroundTertiary,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  keywordText: {
    fontSize: 12,
    color: Theme.colors.textPrimary,
    fontWeight: "600",
  },
  completeButton: {
    height: 56,
    backgroundColor: Theme.colors.primary,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: Theme.colors.textInverse,
  },
  bottomSpacer: {
    height: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.typography.fontSize.base,
  },
});
