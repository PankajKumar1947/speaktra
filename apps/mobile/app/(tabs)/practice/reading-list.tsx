import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../../components";
import Theme from "../../../constants/theme";
import { useDailyChallengeArticles } from "@repo/query";
import { ActivityIndicator } from "react-native";

export default function ReadingListScreen() {
  const { dailyChallengeId } = useLocalSearchParams<{
    dailyChallengeId: string;
  }>();
  const router = useRouter();
  const { data: articleList, isLoading } =
    useDailyChallengeArticles(dailyChallengeId);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (articleList?.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No articles available for today.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {articleList?.map((article) => (
          <TouchableOpacity
            key={article._id}
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/practice/reading-detail",
                params: { articleId: article._id },
              })
            }
          >
            <Card style={styles.articleCard}>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.typeBadge,
                    { backgroundColor: Theme.colors.primary + "15" },
                  ]}
                >
                  <Text style={styles.typeText}>{article.type}</Text>
                </View>
                <View
                  style={[
                    styles.difficultyBadge,
                    {
                      backgroundColor:
                        article.difficulty === "easy"
                          ? Theme.colors.success + "20"
                          : article.difficulty === "medium"
                            ? Theme.colors.warning + "20"
                            : Theme.colors.error + "20",
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
              </View>

              <Text style={styles.title} numberOfLines={2}>
                {article.title}
              </Text>

              {article.keywords && article.keywords.length > 0 && (
                <View style={styles.keywordsContainer}>
                  {article.keywords.slice(0, 3).map((keyword, index) => (
                    <View key={index} style={styles.keywordBadge}>
                      <Text style={styles.keywordText}>{keyword}</Text>
                    </View>
                  ))}
                  {article.keywords.length > 3 && (
                    <Text style={styles.moreKeywords}>
                      +{article.keywords.length - 3} more
                    </Text>
                  )}
                </View>
              )}

              <View style={styles.cardFooter}>
                <View style={styles.metaItem}>
                  <Ionicons
                    name="time-outline"
                    size={16}
                    color={Theme.colors.textTertiary}
                  />
                  <Text style={styles.metaText}>
                    {article.minRead} min read
                  </Text>
                </View>
                <View style={styles.readMore}>
                  <Text style={styles.readMoreText}>Read Article</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={14}
                    color={Theme.colors.primary}
                  />
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  content: {
    padding: Theme.spacing.base,
    gap: Theme.spacing.md,
  },
  articleCard: {
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.background,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  typeBadge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  typeText: {
    fontSize: 10,
    color: Theme.colors.primary,
    fontWeight: Theme.typography.fontWeight.bold,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  difficultyBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    gap: 4,
  },
  difficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: Theme.typography.fontWeight.bold,
    textTransform: "capitalize",
  },
  title: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
    lineHeight: 24,
  },
  keywordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    marginBottom: Theme.spacing.lg,
  },
  keywordBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: Theme.colors.backgroundTertiary,
    borderRadius: Theme.borderRadius.full,
    borderWidth: 1,
    borderColor: Theme.colors.borderLight,
  },
  keywordText: {
    fontSize: 10,
    color: Theme.colors.textSecondary,
    fontWeight: Theme.typography.fontWeight.medium,
  },
  moreKeywords: {
    fontSize: 10,
    color: Theme.colors.textTertiary,
    fontWeight: Theme.typography.fontWeight.medium,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Theme.colors.backgroundSecondary,
    paddingTop: Theme.spacing.md,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.textTertiary,
    fontWeight: Theme.typography.fontWeight.medium,
  },
  readMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  readMoreText: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing.xl,
    backgroundColor: Theme.colors.backgroundSecondary,
  },
  emptyText: {
    textAlign: "center",
    color: Theme.colors.textSecondary,
    fontSize: Theme.typography.fontSize.base,
  },
});
