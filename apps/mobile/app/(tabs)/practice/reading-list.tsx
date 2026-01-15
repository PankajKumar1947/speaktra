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
import { READING_ARTICLES } from "../../../data/reading";

export default function ReadingListScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {READING_ARTICLES.map((article) => (
          <TouchableOpacity
            key={article.id}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/practice/reading-detail",
                params: { id: article.id },
              })
            }
          >
            <Card style={styles.articleCard}>
              <View style={styles.header}>
                <Text style={styles.category}>{article.category}</Text>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor:
                        article.difficulty === "Easy"
                          ? Theme.colors.success
                          : article.difficulty === "Medium"
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
                    {article.estimatedMinutes} min read
                  </Text>
                </View>
                {article.completed && (
                  <Text style={styles.completed}>✓ Read</Text>
                )}
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
});
