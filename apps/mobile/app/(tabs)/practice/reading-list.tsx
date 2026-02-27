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
import { Card } from "../../../components";
import Theme from "../../../constants/theme";

import { useDailyChallengeForUser } from "@repo/query";
import { ActivityIndicator } from "react-native";

export default function ReadingListScreen() {
  const router = useRouter();
  const { data: dailyChallenge, isLoading } = useDailyChallengeForUser();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  const articleList = dailyChallenge?.articles || [];

  if (articleList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No articles available for today.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {articleList.map((article) => (
          <TouchableOpacity
            key={article._id}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/practice/reading-detail",
                params: { id: article._id },
              })
            }
          >
            <Card style={styles.articleCard}>
              <View style={styles.header}>
                <Text style={styles.category}>{article.type}</Text>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor:
                        article.difficulty === "easy"
                          ? Theme.colors.success
                          : article.difficulty === "medium"
                            ? Theme.colors.warning
                            : Theme.colors.error,
                    },
                  ]}
                >
                  <Text style={styles.badgeText}>{article.difficulty}</Text>
                </View>
              </View>
              <Text style={styles.title}>{article.title}</Text>
              <View style={styles.footer}>
                <View style={styles.meta}>
                  <Ionicons
                    name="time"
                    size={16}
                    color={Theme.colors.textSecondary}
                  />
                  <Text style={styles.metaText}>
                    {article.minRead} min read
                  </Text>
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
  container: { flex: 1, backgroundColor: Theme.colors.backgroundSecondary },
  content: { padding: Theme.spacing.base },
  articleCard: { marginBottom: Theme.spacing.md },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.sm,
  },
  category: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.textSecondary,
    textTransform: "uppercase",
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
  badge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.borderRadius.sm,
  },
  badgeText: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textInverse,
  },
  title: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  meta: { flexDirection: "row", alignItems: "center", gap: Theme.spacing.xs },
  metaText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
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
